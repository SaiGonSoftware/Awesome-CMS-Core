using System;
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
	public class PostOptionsRepository : IPostOptionsRepository
	{
		private readonly IUserService _userService;
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;
		private readonly string _currentUserId;

		public PostOptionsRepository(
			IUserService userService,
			IUnitOfWork unitOfWork,
			IMapper mapper)
		{
			_userService = userService;
			_unitOfWork = unitOfWork;
			_mapper = mapper;
			_currentUserId = _userService.GetCurrentUserGuid();
		}

		public async Task<PostOptionsDefaultViewModel> GetAllOptions()
		{
			var vm = new PostOptionsDefaultViewModel
			{
				TagViewModel = await GetAllTag().ConfigureAwait(false),
				CategoriesViewModel = await GetAllCategories().ConfigureAwait(false)
			};

			return vm;
		}

		public async Task<PostOptionsDefaultViewModel> GetAllOptionsByPostId(int postId)
		{
			var tag = await _unitOfWork.Repository<PostOption>()
				.FindBy(po => po.OptionType.Equals(PostOptionType.PostTags)
							  && po.Post.Id == postId)
				.SingleOrDefaultAsync();

			var categories = await _unitOfWork.Repository<PostOption>()
				.FindBy(po => po.OptionType.Equals(PostOptionType.PostCategories)
							  && po.Post.Id == postId)
				.SingleOrDefaultAsync();

			var vm = new PostOptionsDefaultViewModel
			{
				TagViewModel = _mapper.Map<PostOption, PostOptionsViewModel>(tag),
				CategoriesViewModel = _mapper.Map<PostOption, PostOptionsViewModel>(categories)
			};

			return vm;
		}

		public async Task<PostOptionsViewModel> GetAllTag()
		{
			var tagData = await _unitOfWork.Repository<PostOption>()
					.FindBy(po => po.OptionType.Equals(PostOptionType.TagOptions))
					.SingleOrDefaultAsync();

			var tagDataVm = _mapper.Map<PostOption, PostOptionsViewModel>(tagData);

			return tagDataVm;
		}

		public async Task CreateTag(PostOptionsViewModel tagDataVm)
		{
			var currentUser = await GetCurrentUser().ConfigureAwait(false);

			var tagData = _mapper.Map<PostOptionsViewModel, PostOption>(tagDataVm, options =>
			{
				options.AfterMap((src, dest) =>
				{
					dest.User = currentUser;
					dest.OptionType = PostOptionType.TagOptions;
				});
			});

			await _unitOfWork.Repository<PostOption>().AddAsync(tagData);
		}

		public async Task UpdateTag(PostOptionsViewModel tagDataVm)
		{
			var currentUser = await GetCurrentUser().ConfigureAwait(false);

			var tag = await _unitOfWork.Repository<PostOption>()
						.FindAsync(po => po.OptionType.Equals(PostOptionType.TagOptions));

			var tagToUpdate = _mapper.Map(tagDataVm, tag, options =>
			{
				options.AfterMap((src, dest) =>
				{
					dest.User = currentUser;
					dest.OptionType = PostOptionType.TagOptions;
				});
			});

			await _unitOfWork.Repository<PostOption>().UpdateAsync(tagToUpdate);
		}

		public async Task<PostOptionsViewModel> GetAllCategories()
		{
			var categoriesData = await _unitOfWork.Repository<PostOption>()
					.FindBy(po => po.OptionType.Equals(PostOptionType.CategorieOptions))
					.SingleOrDefaultAsync();

			var tagDataVm = _mapper.Map<PostOption, PostOptionsViewModel>(categoriesData);

			return tagDataVm;
		}

		public async Task CreateCategories(PostOptionsViewModel categoriesVm)
		{
			var currentUser = await GetCurrentUser().ConfigureAwait(false);

			var categoriesData = _mapper.Map<PostOptionsViewModel, PostOption>(categoriesVm, options =>
			{
				options.AfterMap((src, dest) =>
				{
					dest.User = currentUser;
					dest.OptionType = PostOptionType.CategorieOptions;
				});
			});

			await _unitOfWork.Repository<PostOption>().AddAsync(categoriesData);
		}

		public async Task UpdateCategories(PostOptionsViewModel categoriesVm)
		{
			var currentUser = await GetCurrentUser();

			var categories = await _unitOfWork.Repository<PostOption>()
					.FindAsync(po => po.OptionType.Equals(PostOptionType.CategorieOptions));

			var categoriesToUpdate = _mapper.Map(categoriesVm, categories, options =>
			{
				options.AfterMap((src, dest) =>
				{
					dest.User = currentUser;
					dest.OptionType = PostOptionType.CategorieOptions;
				});
			});

			await _unitOfWork.Repository<PostOption>().UpdateAsync(categoriesToUpdate);
		}

		public bool IsCategoriesExist()
		{
			return _unitOfWork.Repository<PostOption>().Exist(po => po.OptionType.Equals(PostOptionType.CategorieOptions));
		}

		public bool IsTagExist()
		{
			return _unitOfWork.Repository<PostOption>().Exist(po => po.OptionType.Equals(PostOptionType.TagOptions));
		}

		private async Task<User> GetCurrentUser()
		{
			return await _userService.GetCurrentUserAsync();
		}
	}
}
