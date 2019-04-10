using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Entities.Entities;
using Microsoft.AspNetCore.Identity;

namespace AwesomeCMSCore.Modules.Helper.Services
{
	public interface IUserService
	{
		#region User
		Task<User> GetCurrentUserAsync();
		Task<IEnumerable<User>> GetAllUser();
		Task<IEnumerable<string>> GetAllUserIds();
		string GetCurrentUserGuid();
		string GetCurrentUserName();
		string GetCurrentUserEmail();
		#endregion

		#region User info, user account
		Task<User> GetUserAsync(ClaimsPrincipal principal);
		Task<User> FindByNameAsync(string username);
		Task<User> FindByEmailAsync(string email);
		Task<User> FindByIdAsync(string id);
		Task<IdentityResult> CreateAsync(User user, string password);
		Task<IdentityResult> SetLockoutEnabledAsync(User user, bool enabled);
		Task<IdentityResult> ResetPasswordAsync(User user, string code, string password);
		Task<IdentityResult> ConfirmEmailAsync(User user, string code);
		Task<SignInResult> PasswordSignInAsync(string username, string password, bool rememberMe, bool lockoutOnFailure);
		Task<ClaimsPrincipal> CreateUserPrincipalAsync(User user);
		Task SaveResetPasswordRequest(string token, string email);
		Task<string> GenerateEmailConfirmationTokenAsync(User user);
		Task<string> GeneratePasswordResetTokenAsync(User user);
		Task<int> GetAccessFailedCountAsync(User user);
		Task ToggleRequestPasswordStatusByEmail(string email);
		#endregion

		#region Roles
		Task AddUserToRolesAsync(User user, List<string> roles);
		Task AddUserRoles(string[] userRoles);
		Task RemoveFromRolesAsync(User user, string roles);
		Task RemoveFromRolesAsync(User user, string[] roles);
		Task<List<User>> GetListRoleOfUser(string role);
		IEnumerable<string> GetCurrentUserRoles();
		Task<List<string>> GetUserRoles();
		Task<IList<string>> GetUserRolesByGuid(string userId);
		#endregion

		#region Validate
		Task<bool> CanSignInAsync(User user);
		Task<bool> IsEmailConfirmedAsync(User user);
		Task<bool> IsLockedOutAsync(User user);
		Task<bool> CheckValidResetPasswordToken(string token, string email);
		Task<SignInResult> CheckPasswordSignInAsync(User user, string password, bool lockoutOnFailure);
		Task SignInAsync(User user, bool isPersistent);
		Task SignOutAsync();
		bool IsAuthenticated();
		#endregion
	}
}
