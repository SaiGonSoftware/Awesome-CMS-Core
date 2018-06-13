using System.Collections.Generic;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Account.ViewModels;

namespace AwesomeCMSCore.Modules.Account.Repositories
{
    public interface IAccountRepository
    {
        Task<IEnumerable<UserViewModel>> UserList();
        Task<bool> AccountToggle(AccountToggleViewModel accountToggleVm);
        Task<IEnumerable<UserRoleViewModel>> GetUserRoles();
        Task<IEnumerable<string>> GetUserRolesName();
        Task<bool> AddNewUser(UserInputViewModel userInputVm);
        Task<bool> ValidateDuplicateAccountInfo(UserAccountValidateObject accountValidateObject);
        Task<RolesUserViewModel> GetUserRolesById(string userId);
        Task<bool> EditUserRoles(RolesUserViewModel rolesUserVm);
        Task ManageRoles(string[] roles);
    }
}
