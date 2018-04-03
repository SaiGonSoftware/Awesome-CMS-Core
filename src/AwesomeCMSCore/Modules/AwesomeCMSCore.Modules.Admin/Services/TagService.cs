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

        public TagService(
            IUserService userService,
            IUnitOfWork unitOfWork)
        {
            _userService = userService;
            _unitOfWork = unitOfWork;
        }

        public async Task<List<Tag>> GetAllTag()
        {
            var currentUserId = _userService.GetCurrentUserGuid();
            return await _unitOfWork.Repository<Tag>().FindBy(x => x.User.Id == currentUserId).ToListAsync();
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
    }
}
