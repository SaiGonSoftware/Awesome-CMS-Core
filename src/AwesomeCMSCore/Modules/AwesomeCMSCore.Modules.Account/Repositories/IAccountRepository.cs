using System.Collections.Generic;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Account.ViewModels;
using AwesomeCMSCore.Modules.Entities.ViewModel;

namespace AwesomeCMSCore.Modules.Account.Repositories
{
	public interface IAccountRepository
	{
		Task<IEnumerable<AccountViewModel>> GetUserList();
		Task<bool> AccountToggle(AccountToggleViewModel accountToggleVm);
		Task<IEnumerable<UserRoleViewModel>> GetUserRoles();
		Task<IEnumerable<string>> GetUserRolesName();
		Task<bool> AddNewUser(UserInputViewModel userInputVm);
		Task<bool> ValidateDuplicateAccountInfo(UserAccountValidateObject accountValidateObject);
		Task<RolesUserViewModel> GetUserRolesById(string userId);
		Task<bool> EditUserRoles(RolesUserViewModel rolesUserVm);
		Task ManageRoles(SelectOptionList roles);
	}
}
