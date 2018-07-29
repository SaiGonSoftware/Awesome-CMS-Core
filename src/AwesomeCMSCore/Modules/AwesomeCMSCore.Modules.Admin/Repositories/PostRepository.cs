using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using AwesomeCMSCore.Modules.Admin.ViewModels;
using AwesomeCMSCore.Modules.Entities.Entities;
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

        public async Task<IEnumerable<PostListViewModel>> GetAllPost()
        {
            var posts = await _unitOfWork.Repository<Post>().Query().ToListAsync();
            return _mapper.Map<IEnumerable<Post>, IEnumerable<PostListViewModel>>(posts);
        }

        public async Task<PostViewModel> GetPost(int postId)
        {
            var post = await _unitOfWork.Repository<Post>().GetByIdAsync(postId);
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
    }
}
