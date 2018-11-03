using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AwesomeCMSCore.Modules.Admin.ViewModels;
using AwesomeCMSCore.Modules.Client.ViewModels;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Entities.Enums;
using AwesomeCMSCore.Modules.Helper.Services;
using AwesomeCMSCore.Modules.Repositories;
using Microsoft.EntityFrameworkCore;

namespace AwesomeCMSCore.Modules.Client.Repositories
{
	public class PostRepository: IPostRepository
	{
		private readonly IUserService _userService;
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;
		private readonly string _currentUserId;

		public PostRepository(IUserService userService,
			IUnitOfWork unitOfWork,
			IMapper mapper)
		{
			_userService = userService;
			_unitOfWork = unitOfWork;
			_mapper = mapper;
			_currentUserId = _userService.GetCurrentUserGuid();
		}

		public async Task<IndexViewModel> GetIndexViewModel()
		{
			var postQuery =  _unitOfWork.Repository<Post>().Query().Where(p => p.PostStatus == PostStatus.Published).AsQueryable();

			var posts = await postQuery.ToListAsync();
			var popularPost = await postQuery.OrderByDescending(p => p.Views).Take(5).ToListAsync();
			var recentPost = await postQuery.OrderByDescending(p => p.DateCreated).FirstOrDefaultAsync();

			var vm = new IndexViewModel
			{
				Posts = _mapper.Map<IEnumerable<Post>, IEnumerable<PostListViewModel>>(posts),
				PopularPosts = _mapper.Map<IEnumerable<Post>, IEnumerable<PostListViewModel>>(popularPost),
				RecentPosts = _mapper.Map<Post, PostIndexViewModel>(recentPost),
			};

			return vm;
		}
	}
}
