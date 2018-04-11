using System.Collections.Generic;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Account.ViewModels;

namespace AwesomeCMSCore.Modules.Account.Services
{
    public interface IAccountService
    {
        Task<IEnumerable<UserViewModel>> UserList();
        Task AccountToggle(AccountToggleViewModel accountToggleVm);
    }
}
