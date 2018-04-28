using AwesomeCMSCore.Modules.Account.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AwesomeCMSCore.Modules.Account.Services
{
    public interface IGroupService
    {
        Task<IEnumerable<GroupViewModel>> GroupListAsync();
        Task<GroupViewModel> GetGroup(string id);
        Task<bool> CreateGroup(GroupViewModel groupViewModel);
    }
}
