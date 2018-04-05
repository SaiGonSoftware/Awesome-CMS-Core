using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AwesomeCMSCore.Modules.Admin.ViewModels;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Helper.Services;
using AwesomeCMSCore.Modules.Repositories;
using Microsoft.EntityFrameworkCore;

namespace AwesomeCMSCore.Modules.Admin.Services
{
    public class TagService : ITagService
    {
        private readonly IUserService _userService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly string _currentUserId;
        private readonly IMapper _mapper;

        public TagService(
            IUserService userService,
            IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _userService = userService;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _currentUserId = _userService.GetCurrentUserGuid();
        }

        public async Task<TagDataViewModel> GetAllTag()
        {
            var tagData = await _unitOfWork.Repository<Tag>().FindBy(x => x.UserId == _currentUserId).SingleOrDefaultAsync();
            var tagDataVm = _mapper.Map<Tag, TagDataViewModel>(tagData);

            return tagDataVm;
        }

        public async Task CreateTag(TagDataViewModel tagDataVm)
        {
            var tagData = _mapper.Map<TagDataViewModel, Tag>(tagDataVm, options =>
            {
                options.AfterMap((src, dest) => dest.UserId = _currentUserId);
            });

            await _unitOfWork.Repository<Tag>().AddAsync(tagData);
        }

        public async Task UpdateTag(TagDataViewModel tagDataVm)
        {
            var tag = await _unitOfWork.Repository<Tag>().FindAsync(x => x.UserId == _currentUserId);
            var tagToUpdate = _mapper.Map<Tag>(tag);

            await _unitOfWork.Repository<Tag>().UpdateAsync(tagToUpdate);
        }

        public bool IsTagExist()
        {
            return _unitOfWork.Repository<Tag>().Exist(x => x.UserId == _currentUserId);
        }
    }
}
