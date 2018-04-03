using System.Collections.Generic;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Admin.ViewModels;
using AwesomeCMSCore.Modules.Entities.Entities;

namespace AwesomeCMSCore.Modules.Admin.Services
{
    public interface ITagService
    {
        Task<List<Tag>> GetAllTag();
        Task CreateTag(TagDataViewModel tagData);
    }
}
