using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Entities.Entities;
using Microsoft.AspNetCore.Identity;

namespace AwesomeCMSCore.Modules.Helper.Services
{
    public interface IUserService
    {
        Task<User> GetCurrentUserAsync();
        string GetCurrentUserGuid();
        string GetCurrentUserName();
        string GetCurrentUserEmail();
        List<string> GetCurrentUserRoles();
        Task<List<string>> GetUserRoles();
        Task<IList<string>> GetUserRolesByGuid(string userId);
        bool IsAuthenticated();
        Task<User> FindByNameAsync(string username);
        Task<User> FindByEmailAsync(string email);
        Task<User> FindByIdAsync(string id);
        Task<IdentityResult> CreateAsync(User user, string password);
        Task<IdentityResult> SetLockoutEnabledAsync(User user, bool enabled);
        Task<IdentityResult> ResetPasswordAsync(User user, string code, string password);
        Task<IdentityResult> ConfirmEmailAsync(User user, string code);
        Task<string> GenerateEmailConfirmationTokenAsync(User user);
        Task<string> GeneratePasswordResetTokenAsync(User user);
        Task<bool> IsEmailConfirmedAsync(User user);
        Task<bool> IsLockedOutAsync(User user);
        Task<int> GetAccessFailedCountAsync(User user);
        Task<SignInResult> PasswordSignInAsync(string username, string password,
            bool rememberMe, bool lockoutOnFailure);

        Task<ClaimsPrincipal> CreateUserPrincipalAsync(User user);
        Task<bool> CanSignInAsync(User user);
        Task<User> GetUserAsync(ClaimsPrincipal principal);
        Task<SignInResult> CheckPasswordSignInAsync(User user, string password,bool lockoutOnFailure);
        Task SignInAsync(User user, bool isPersistent);
        Task AddUserToRolesAsync(User user, List<string> roles);
        Task AddUserRoles(string[] userRoles);
        Task RemoveFromRolesAsync(User user, string roles);
        Task RemoveFromRolesAsync(User user, string [] roles);
        Task SignOutAsync();
    }
}
