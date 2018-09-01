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

        public async Task<PostOptionsViewModel> GetAllTag()
        {
            var tagData = await _unitOfWork.Repository<PostOption>()
                    .FindBy(po => po.OptionType.Equals(PostOptionType.TagOptions.ToString(), StringComparison.OrdinalIgnoreCase))
                    .SingleOrDefaultAsync();
            var tagDataVm = _mapper.Map<PostOption, PostOptionsViewModel>(tagData);

            return tagDataVm;
        }

        public async Task CreateTag(TagViewModel tagDataVm)
        {
            var tagData = _mapper.Map<TagViewModel, Tag>(tagDataVm, options =>
            {
                options.AfterMap((src, dest) => dest.UserId = _currentUserId);
            });

            await _unitOfWork.Repository<Tag>().AddAsync(tagData);
        }

        public async Task UpdateTag(TagViewModel tagDataVm)
        {
            var tag = await _unitOfWork.Repository<Tag>().FindAsync(x => x.UserId == _currentUserId);
            var tagToUpdate = _mapper.Map(tagDataVm, tag, options =>
            {
                options.AfterMap((src, dest) => dest.UserId = _currentUserId);
            });

            await _unitOfWork.Repository<Tag>().UpdateAsync(tagToUpdate);
        }

        public bool IsTagExist()
        {
            return _unitOfWork.Repository<Tag>().Exist(x => x.UserId == _currentUserId);
        }

        public async Task<PostOptionsViewModel> GetAllCategories()
        {
            var categoriesData = await _unitOfWork.Repository<PostOption>()
                    .FindBy(po => po.OptionType.Equals(PostOptionType.CategorieOptions.ToString(), StringComparison.OrdinalIgnoreCase))
                    .SingleOrDefaultAsync();
            var tagDataVm = _mapper.Map<PostOption, PostOptionsViewModel>(categoriesData);

            return tagDataVm;
        }

        public async Task CreateCategories(CategoriesViewModel categoriesVm)
        {
            var categoriesData = _mapper.Map<CategoriesViewModel, Categories>(categoriesVm, options =>
            {
                options.AfterMap((src, dest) => dest.UserId = _currentUserId);
            });

            await _unitOfWork.Repository<Categories>().AddAsync(categoriesData);
        }

        public async Task UpdateCategories(CategoriesViewModel categoriesVm)
        {
            var categories = await _unitOfWork.Repository<Categories>().FindAsync(x => x.UserId == _currentUserId);
            var categoriesToUpdate = _mapper.Map(categoriesVm, categories, options =>
            {
                options.AfterMap((src, dest) => dest.UserId = _currentUserId);
            });

            await _unitOfWork.Repository<Categories>().UpdateAsync(categoriesToUpdate);
        }

        public bool IsCategoriesExist()
        {
            return _unitOfWork.Repository<Categories>().Exist(x => x.UserId == _currentUserId);
        }
    }
}
