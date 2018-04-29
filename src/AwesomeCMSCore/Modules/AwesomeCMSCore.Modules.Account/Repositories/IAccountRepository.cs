using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Account.ViewModels;
using Microsoft.AspNetCore.Identity;

namespace AwesomeCMSCore.Modules.Account.Repositories
{
    public interface IAccountRepository
    {
        Task<IEnumerable<UserViewModel>> UserList();
<<<<<<< HEAD
        Task<bool> AccountToggle(AccountToggleViewModel accountToggleVm);
        Task<IEnumerable<UserRoleViewModel>> GetUserRoles();
        Task<bool> AddNewUser(UserInputViewModel userInputVm);
<<<<<<< HEAD
<<<<<<< HEAD
        Task<bool> ValidateDuplicateAccountInfo(UserAccountValidateObject accountValidateObject);
<<<<<<< HEAD
        Task<IEnumerable<UserRoleViewModel>> GetUserRoles();
        Task AddNewUser(UserInputViewModel userInputVm);
=======
        Task<IEnumerable<IdentityRole>> RoleList();
        Task AccountToggle(AccountToggleViewModel accountToggleVm);
>>>>>>> Create Group Completed
=======
>>>>>>> add user modal
=======
        Task<bool> ValidateDuplicateAccountInfo(UserAccountValidateObject accountValidateObject); 
>>>>>>> add new user
=======
        Task<bool> ValidateDuplicateAccountInfo(UserAccountValidateObject accountValidateObject);
   
>>>>>>> reslove merging issues
    }
}
