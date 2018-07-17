using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AwesomeCMSCore.Modules.Admin.Models;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Helper.Services;
using AwesomeCMSCore.Modules.Repositories;
using Microsoft.EntityFrameworkCore;

namespace AwesomeCMSCore.Modules.Admin.Repositories
{
    public class PostRepository: IPostRepository
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
            return _mapper.Map<List<Post>, List<PostListViewModel>>(posts);
        }

        public async Task EditPost(PostViewModel postViewModel)
        {
            var postData = _mapper.Map<PostViewModel, Post>(postViewModel, options =>
            {
                options.AfterMap((src, dest) => dest.User.Id = _currentUserId);
            });

            await _unitOfWork.Repository<Post>().UpdateAsync(postData);
        }

        public async Task SavePost(PostViewModel postViewModel)
        {
            var user =  await _userService.GetCurrentUserAsync();

            var postData = _mapper.Map<PostViewModel, Post>(postViewModel, options =>
            {
                options.AfterMap((src, dest) => dest.User = user);
            });
            
            await _unitOfWork.Repository<Post>().AddAsync(postData);
        }
    }
}
