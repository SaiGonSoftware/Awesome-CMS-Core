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
            var posts = _unitOfWork.Repository<Post>().Query();

            var viewModel = new PostDefaultViewModel
            {
                PostsPublished = await GetPostsByStatus(posts, PostStatus.Published),
                NumberOfPostPublished = CountPost(posts, PostStatus.Published),
                PostsDrafted = await GetPostsByStatus(posts, PostStatus.Draft),
                NumberOfDraftedPost = CountPost(posts, PostStatus.Draft),
                PostsDeleted = await GetPostsByStatus(posts, PostStatus.Deleted),
                NumberOfDeletedPost = CountPost(posts, PostStatus.Deleted)
            };

            return viewModel;
        }

        public async Task<PostViewModel> GetPost(int postId)
        {
            var post = await GetPostById(postId);
            var tag = await _unitOfWork.Repository<Tag>().FindAsync(x => x.PostId == post.Id);
            var postViewModel = _mapper.Map<Post, PostViewModel>(post,
                options =>
                {
                    options.AfterMap((src, dest) =>
                    {
                        dest.TagData = tag?.TagData;
                        dest.TagOptions = tag?.TagOptions;
                    });
                });

            return postViewModel;
        }

        public async Task EditPost(PostViewModel postViewModel)
        {
            var user = await _userService.GetCurrentUserAsync();

            var postData = _mapper.Map<PostViewModel, Post>(postViewModel, options =>
            {
                options.AfterMap((src, dest) => dest.User = user);
            });

            await _unitOfWork.Repository<Post>().UpdateAsync(postData);

            var tagToDelete = await _unitOfWork.Repository<Tag>().FindAsync(t => t.PostId == postViewModel.Id);
            await _unitOfWork.Repository<Tag>().DeleteAsync(tagToDelete);

            var tag = new Tag
            {
                PostId = postViewModel.Id,
                TagData = postViewModel.TagData,
                TagOptions = postViewModel.TagOptions,
                UserId = _currentUserId
            };
            await _unitOfWork.Repository<Tag>().AddAsync(tag);
        }

        public async Task SavePost(PostViewModel postViewModel)
        {
            var user = await _userService.GetCurrentUserAsync();

            var postData = _mapper.Map<PostViewModel, Post>(postViewModel, options =>
            {
                options.AfterMap((src, dest) => dest.User = user);
            });

            var post = await _unitOfWork.Repository<Post>().AddAsync(postData);

            var tag = new Tag
            {
                PostId = post.Id,
                TagData = postViewModel.TagData,
                TagOptions = postViewModel.TagOptions,
                UserId = _currentUserId
            };
            await _unitOfWork.Repository<Tag>().AddAsync(tag);
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

        private async Task<IEnumerable<PostListViewModel>> GetPostsByStatus(IQueryable<Post> posts, PostStatus postStatus)
        {
            return _mapper.Map<IEnumerable<Post>, IEnumerable<PostListViewModel>>(
                await posts.Where(p => p.PostStatus == postStatus).ToListAsync());
        }

        private int CountPost(IQueryable<Post> posts, PostStatus postStatus)
        {
            return posts.Count(p => p.PostStatus.Equals(postStatus));
        }

        private async Task<Post> GetPostById(int postId)
        {
            return await _unitOfWork.Repository<Post>().GetByIdAsync(postId);
        }
    }
}
