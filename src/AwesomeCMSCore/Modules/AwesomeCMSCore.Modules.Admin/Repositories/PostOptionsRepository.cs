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
                TagViewModel = await GetAllTag(),
                CategoriesViewModel = await GetAllCategories()
            };

            return vm;
        }

        public async Task<PostOptionsDefaultViewModel> GetAllOptionsByPostId(int postId)
        {
            var tag = await _unitOfWork.Repository<PostOption>()
                .FindBy(po => po.OptionType.Equals(PostOptionType.PostTags.ToString(), StringComparison.OrdinalIgnoreCase)
                              && po.Post.Id == postId)
                .SingleOrDefaultAsync();

            var categories = await _unitOfWork.Repository<PostOption>()
                .FindBy(po => po.OptionType.Equals(PostOptionType.PostCategories.ToString(), StringComparison.OrdinalIgnoreCase)
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
                    .FindBy(po => po.OptionType.Equals(PostOptionType.TagOptions.ToString(), StringComparison.OrdinalIgnoreCase))
                    .SingleOrDefaultAsync();

            var tagDataVm = _mapper.Map<PostOption, PostOptionsViewModel>(tagData);

            return tagDataVm;
        }

        public async Task CreateTag(PostOptionsViewModel tagDataVm)
        {
            var currentUser = await GetCurrentUser();

            var tagData = _mapper.Map<PostOptionsViewModel, PostOption>(tagDataVm, options =>
            {
                options.AfterMap((src, dest) =>
                {
                    dest.User = currentUser;
                    dest.OptionType = PostOptionType.TagOptions.ToString();
                });
            });

            await _unitOfWork.Repository<PostOption>().AddAsync(tagData);
        }

        public async Task UpdateTag(PostOptionsViewModel tagDataVm)
        {
            var currentUser = await GetCurrentUser();

            var tag = await _unitOfWork.Repository<PostOption>()
                        .FindAsync(po => po.OptionType.Equals(PostOptionType.TagOptions.ToString(), StringComparison.OrdinalIgnoreCase));

            var tagToUpdate = _mapper.Map(tagDataVm, tag, options =>
            {
                options.AfterMap((src, dest) =>
                {
                    dest.User = currentUser;
                    dest.OptionType = PostOptionType.TagOptions.ToString();
                });
            });

            await _unitOfWork.Repository<PostOption>().UpdateAsync(tagToUpdate);
        }

        public async Task<PostOptionsViewModel> GetAllCategories()
        {
            var categoriesData = await _unitOfWork.Repository<PostOption>()
                    .FindBy(po => po.OptionType.Equals(PostOptionType.CategorieOptions.ToString(), StringComparison.OrdinalIgnoreCase))
                    .SingleOrDefaultAsync();

            var tagDataVm = _mapper.Map<PostOption, PostOptionsViewModel>(categoriesData);

            return tagDataVm;
        }

        public async Task CreateCategories(PostOptionsViewModel categoriesVm)
        {
            var currentUser = await GetCurrentUser();

            var categoriesData = _mapper.Map<PostOptionsViewModel, PostOption>(categoriesVm, options =>
            {
                options.AfterMap((src, dest) =>
                {
                    dest.User = currentUser;
                    dest.OptionType = PostOptionType.CategorieOptions.ToString();
                });
            });

            await _unitOfWork.Repository<PostOption>().AddAsync(categoriesData);
        }

        public async Task UpdateCategories(PostOptionsViewModel categoriesVm)
        {
            var currentUser = await GetCurrentUser();

            var categories = await _unitOfWork.Repository<PostOption>()
                    .FindAsync(po => po.OptionType.Equals(PostOptionType.CategorieOptions.ToString(), StringComparison.OrdinalIgnoreCase));

            var categoriesToUpdate = _mapper.Map(categoriesVm, categories, options =>
            {
                options.AfterMap((src, dest) =>
                {
                    dest.User = currentUser;
                    dest.OptionType = PostOptionType.CategorieOptions.ToString();
                });
            });

            await _unitOfWork.Repository<PostOption>().UpdateAsync(categoriesToUpdate);
        }

        public bool IsCategoriesExist()
        {
            return _unitOfWork.Repository<PostOption>().Exist(po => po.OptionType.Equals(PostOptionType.CategorieOptions.ToString(), StringComparison.OrdinalIgnoreCase));
        }

        public bool IsTagExist()
        {
            return _unitOfWork.Repository<PostOption>().Exist(po => po.OptionType.Equals(PostOptionType.TagOptions.ToString(), StringComparison.OrdinalIgnoreCase));
        }

        private async Task<User> GetCurrentUser()
        {
            return await _userService.GetCurrentUserAsync();
        }
    }
}
