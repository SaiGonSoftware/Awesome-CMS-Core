using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Helper.Repository;
using AwesomeCMSCore.Modules.Helper.Services;

namespace AwesomeCMSCore.Modules.Admin.Services
{
    public class TagService : ITagService
    {
        private readonly IGenericRepository<Tag> _tagRepository;
        private readonly IUserService _userService;

        public TagService(
            IGenericRepository<Tag> tagRepository,
            IUserService userService)
        {
            _tagRepository = tagRepository;
            _userService = userService;
        }

        public async Task<ICollection<Tag>> GetAllTag()
        {
            return await _tagRepository.GetAllAsync();
        }

        public async Task CreateTag(string tagName)
        {
            var tagModel = new Tag
            {
                TagName = tagName,
                User = await _userService.GetCurrentUserAsync(),
                UniqeId = Guid.NewGuid()
            };

            await _tagRepository.AddAsync(tagModel);
        }
    }
}
