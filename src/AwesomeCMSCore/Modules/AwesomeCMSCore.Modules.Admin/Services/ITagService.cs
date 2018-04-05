using System.Collections.Generic;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Admin.ViewModels;
using AwesomeCMSCore.Modules.Entities.Entities;

namespace AwesomeCMSCore.Modules.Admin.Services
{
    public interface ITagService
    {
        Task<TagDataViewModel> GetAllTag();
        Task CreateTag(TagDataViewModel tagDataVm);
        Task UpdateTag(TagDataViewModel tagDataVm);
        bool IsTagExist();
    }
}
