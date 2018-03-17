using System.Collections.Generic;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Entities.Entities;

namespace AwesomeCMSCore.Modules.Admin.Services
{
    public interface ITagService
    {
        Task<ICollection<Tag>> GetAllTag();
        Task CreateTag(Tag tagModel,string currentUserId);
    }
}
