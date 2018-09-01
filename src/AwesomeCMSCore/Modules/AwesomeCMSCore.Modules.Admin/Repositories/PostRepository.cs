using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AwesomeCMSCore.Modules.Admin.ViewModels;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Entities.Enums;
using AwesomeCMSCore.Modules.Helper.Services;
using AwesomeCMSCore.Modules.Repositories;
using Microsoft.EntityFrameworkCore;

namespace AwesomeCMSCore.Modules.Admin.Repositories
{
    public class PostRepository : IPostRepository
    {
        private readonly IUserService _userService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPostOptionsRepository _postOptionsRepository;
        private readonly string _currentUserId;

        public PostRepository(IUserService userService,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            IPostOptionsRepository postOptionsRepository)
        {
            _userService = userService;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _postOptionsRepository = postOptionsRepository;
            _currentUserId = _userService.GetCurrentUserGuid();
        }

        public async Task<IEnumerable<PostListViewModel>> GetAllPosts()
        {
            var posts = await _unitOfWork.Repository<Post>().Query().ToListAsync();
            return _mapper.Map<IEnumerable<Post>, IEnumerable<PostListViewModel>>(posts);
        }

        public async Task<PostDefaultViewModel> GetPostsDefaultViewModel()
        {
            var posts = await _unitOfWork.Repository<Post>().Query().ToListAsync();

            var viewModel = new PostDefaultViewModel
            {
                PostsPublished = GetPostsByStatus(posts, PostStatus.Published),
                NumberOfPostPublished = CountPost(posts, PostStatus.Published),
                PostsDrafted = GetPostsByStatus(posts, PostStatus.Draft),
                NumberOfDraftedPost = CountPost(posts, PostStatus.Draft),
                PostsDeleted = GetPostsByStatus(posts, PostStatus.Deleted),
                NumberOfDeletedPost = CountPost(posts, PostStatus.Deleted)
            };

            return viewModel;
        }

        public async Task<PostViewModel> GetPost(int postId)
        {
            var post = await GetPostById(postId);

            var postOptions = await _postOptionsRepository.GetAllOptionsByPostId(postId);

            var postViewModel = _mapper.Map<Post, PostViewModel>(post,
                options =>
                {
                    options.AfterMap((src, dest) => { dest.PostOptionsDefaultViewModel = postOptions; });
                });

            return postViewModel;
        }

        public async Task EditPost(PostViewModel postViewModel)
        {
            var currentUser = await _userService.GetCurrentUserAsync();

            var postData = _mapper.Map<PostViewModel, Post>(postViewModel, options =>
            {
                options.AfterMap((src, dest) => dest.User = currentUser);
            });

            await _unitOfWork.Repository<Post>().UpdateAsync(postData);

            var tagToUpdate = _mapper.Map<PostOptionsViewModel, PostOption>(postViewModel.PostOptionsDefaultViewModel.TagViewModel, options =>
            {
                options.AfterMap((src, dest) =>
                {
                    dest.User = currentUser;
                    dest.OptionType = PostOptionType.TagOptions.ToString();
                });
            });

            var categoriesToUpdate = _mapper.Map<PostOptionsViewModel, PostOption>(postViewModel.PostOptionsDefaultViewModel.CategoriesViewModel, options =>
            {
                options.AfterMap((src, dest) =>
                {
                    dest.User = currentUser;
                    dest.OptionType = PostOptionType.CategorieOptions.ToString();
                });
            });

            await _unitOfWork.Repository<PostOption>().UpdateAsync(tagToUpdate);
            await _unitOfWork.Repository<PostOption>().UpdateAsync(categoriesToUpdate);
        }

        public async Task SavePost(PostViewModel postViewModel)
        {
            var user = await _userService.GetCurrentUserAsync();

            var postData = _mapper.Map<PostViewModel, Post>(postViewModel, options =>
            {
                options.AfterMap((src, dest) => dest.User = user);
            });

            var post = await _unitOfWork.Repository<Post>().AddAsync(postData);

            var tag = new PostOption
            {
                Key = postViewModel.PostOptionsDefaultViewModel.TagViewModel.Key,
                Value = postViewModel.PostOptionsDefaultViewModel.TagViewModel.Value,
                OptionType = PostOptionType.TagOptions.ToString(),
                User = await _userService.GetCurrentUserAsync(),
                Post = post
            };

            var categories = new PostOption
            {
                Key = postViewModel.PostOptionsDefaultViewModel.CategoriesViewModel.Key,
                Value = postViewModel.PostOptionsDefaultViewModel.CategoriesViewModel.Value,
                OptionType = PostOptionType.CategorieOptions.ToString(),
                User = await _userService.GetCurrentUserAsync(),
                Post = post
            };

            await _unitOfWork.Repository<PostOption>().AddAsync(tag);
            await _unitOfWork.Repository<PostOption>().AddAsync(categories);
        }

        public async Task RestorePost(int postId)
        {
            var postsToRestore = await GetPostById(postId);
            postsToRestore.PostStatus = PostStatus.Published;
            await _unitOfWork.Commit();
        }

        public async Task DeletePost(int postId)
        {
            var postsToDelete = await GetPostById(postId);
            postsToDelete.PostStatus = PostStatus.Deleted;
            await _unitOfWork.Commit();
        }

        private IEnumerable<PostListViewModel> GetPostsByStatus(IEnumerable<Post> posts, PostStatus postStatus)
        {
            return _mapper.Map<IEnumerable<Post>, IEnumerable<PostListViewModel>>(posts.Where(p => p.PostStatus.Equals(postStatus)));
        }

        private static int CountPost(IEnumerable<Post> posts, PostStatus postStatus)
        {
            return posts.Count(p => p.PostStatus.Equals(postStatus));
        }

        private async Task<Post> GetPostById(int postId)
        {
            return await _unitOfWork.Repository<Post>().GetByIdAsync(postId);
        }
    }
}
