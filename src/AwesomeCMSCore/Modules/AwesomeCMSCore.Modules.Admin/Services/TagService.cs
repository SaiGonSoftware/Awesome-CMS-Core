using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public TagService(
            IUserService userService,
            IUnitOfWork unitOfWork)
        {
            _userService = userService;
            _unitOfWork = unitOfWork;
            _currentUserId = _userService.GetCurrentUserGuid();
        }

        public async Task<List<Tag>> GetAllTag()
        {
            return await _unitOfWork.Repository<Tag>().FindBy(x => x.User.Id == _currentUserId).ToListAsync();
        }

        public async Task CreateTag(TagDataViewModel tagData)
        {
            var tagModel = new Tag
            {
                TagData = tagData.TagData,
                TagOptions = tagData.TagOptions,
                User = await _userService.GetCurrentUserAsync()
            };

            await _unitOfWork.Repository<Tag>().AddAsync(tagModel);
        }

        public async Task UpdateTag(TagDataViewModel tagData)
        {
            var tagToUpdate = await _unitOfWork.Repository<Tag>().FindAsync(x => x.User.Id == _currentUserId);

            tagToUpdate.TagData = tagData.TagData;
            tagToUpdate.TagOptions = tagData.TagOptions;
            tagToUpdate.User = await _userService.GetCurrentUserAsync();

            await _unitOfWork.Repository<Tag>().UpdateAsync(tagToUpdate);
        }

        public bool IsTagExist()
        {
            return _unitOfWork.Repository<Tag>().Exist(x => x.User.Id == _currentUserId);
        }
    }
}
