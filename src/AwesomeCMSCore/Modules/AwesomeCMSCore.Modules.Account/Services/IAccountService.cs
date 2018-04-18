using System.Collections.Generic;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Account.ViewModels;

namespace AwesomeCMSCore.Modules.Account.Services
{
    public interface IAccountService
    {
        Task<IEnumerable<UserViewModel>> UserList();
        Task<bool> AccountToggle(AccountToggleViewModel accountToggleVm);
        Task<IEnumerable<UserRoleViewModel>> GetUserRoles();
        Task<bool> AddNewUser(UserInputViewModel userInputVm);
        Task<bool> ValidateDuplicateAccountInfo(UserAccountValidateObject accountValidateObject);
        Task<IEnumerable<UserRoleViewModel>> GetUserRoles();
    }
}
