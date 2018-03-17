using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Helper.Repository;

namespace AwesomeCMSCore.Modules.Admin.Services
{
    public class TagService : ITagService
    {
        private readonly IGenericRepository<Tag> _tagRepository;

        public TagService(IGenericRepository<Tag> tagRepository)
        {
            _tagRepository = tagRepository;
        }

        public async Task<ICollection<Tag>> GetAllTag()
        {
            return await _tagRepository.GetAllAsync();
        }

        public Task CreateTag(Tag tagModel, string currentUserId)
        {
            throw new NotImplementedException();
        }
    }
}
