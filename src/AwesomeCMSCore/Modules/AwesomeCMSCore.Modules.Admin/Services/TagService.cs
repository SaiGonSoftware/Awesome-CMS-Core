using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Helper.Services;
using AwesomeCMSCore.Modules.Repositories;

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

        public async Task<ICollection<Tag>> GetAllTag()
        {
            return await _unitOfWork.Repository<Tag>().GetAllAsync();
        }

        public async Task CreateTag(string tagName)
        {
            var tagModel = new Tag
            {
                TagName = tagName,
                User = await _userService.GetCurrentUserAsync()
            };

            await _unitOfWork.Repository<Tag>().AddAsync(tagModel);
        }
    }
}
