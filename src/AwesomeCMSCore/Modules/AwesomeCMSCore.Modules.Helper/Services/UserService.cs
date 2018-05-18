using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Helper.Enum;
using AwesomeCMSCore.Modules.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AwesomeCMSCore.Modules.Helper.Services
{
    public class UserService : IUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IGenericRepository<User> _userRepository;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<ApplicationRole> _roleManager;

        private readonly string _currentUserGuid;
        private readonly string _currentUserName;
        private readonly string _currentUserEmail;

        public UserService(
            IHttpContextAccessor httpContextAccessor,
            IGenericRepository<User> userRepository,
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            RoleManager<ApplicationRole> roleManager)
        {
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _currentUserGuid = _httpContextAccessor?.HttpContext?.User?.FindFirst(UserClaimsKey.Sub)?.Value;
            _currentUserName = _httpContextAccessor?.HttpContext?.User?.Identity?.Name;
            _currentUserEmail = _currentUserGuid == null ? "" : userManager.FindByIdAsync(_currentUserGuid)?.Result?.Email;
        }

        public async Task<User> GetCurrentUserAsync()
        {
           return await _userRepository.GetByIdAsync(_currentUserGuid);
        }

        public string GetCurrentUserGuid()
        {
            return _currentUserGuid;
        }

        public string GetCurrentUserName()
        {
            return _currentUserName;
        }

        public string GetCurrentUserEmail()
        {
            return _currentUserEmail;
        }

        public async Task<List<string>> GetUserRoles()
        {
            return await _roleManager.Roles.Select(x => x.Name).ToListAsync();
        }

        public async Task<IList<string>> GetUserRolesByGuid(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            return await _userManager.GetRolesAsync(user);
        }
        
        public bool IsAuthenticated()
        {
            return _httpContextAccessor.HttpContext.User.Identity.IsAuthenticated;
        }

        public async Task<User> FindByNameAsync(string username)
        {
            return await _userManager.FindByNameAsync(username);
        }

        public async Task<User> FindByEmailAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        public async Task<User> FindByIdAsync(string id)
        {
            return await _userManager.FindByIdAsync(id);
        }

        public async Task<IdentityResult> CreateAsync(User user, string password)
        {
            return await _userManager.CreateAsync(user, password);
        }

        public async Task<IdentityResult> SetLockoutEnabledAsync(User user, bool enabled)
        {
            return await _userManager.SetLockoutEnabledAsync(user, enabled);
        }

        public async Task<IdentityResult> ResetPasswordAsync(User user, string code, string password)
        {
            return await _userManager.ResetPasswordAsync( user, code, password);
        }

        public async Task<IdentityResult> ConfirmEmailAsync(User user, string code)
        {
            return await _userManager.ConfirmEmailAsync(user, code);
        }

        public async Task<string> GenerateEmailConfirmationTokenAsync(User user)
        {
            return await _userManager.GenerateEmailConfirmationTokenAsync(user);
        }

        public async Task<string> GeneratePasswordResetTokenAsync(User user)
        {
            return await _userManager.GeneratePasswordResetTokenAsync(user);
        }

        public async Task<bool> IsEmailConfirmedAsync(User user)
        {
            return await _userManager.IsEmailConfirmedAsync(user);
        }

        public async Task<bool> IsLockedOutAsync(User user)
        {
            return await _userManager.IsLockedOutAsync(user);
        }

        public async Task<int> GetAccessFailedCountAsync(User user)
        {
            return await _userManager.GetAccessFailedCountAsync(user);
        }

        public async Task<SignInResult> PasswordSignInAsync(string username, string password, bool rememberMe, bool lockoutOnFailure)
        {
           return await _signInManager.PasswordSignInAsync(username, password, rememberMe, lockoutOnFailure);
        }

        public async Task<ClaimsPrincipal> CreateUserPrincipalAsync(User user)
        {
            return await _signInManager.CreateUserPrincipalAsync(user);
        }

        public async Task<bool> CanSignInAsync(User user)
        {
            return await _signInManager.CanSignInAsync(user);
        }

        public async Task<User> GetUserAsync(ClaimsPrincipal principal)
        {
            return await _userManager.GetUserAsync(principal);
        }

        public async Task<SignInResult> CheckPasswordSignInAsync(User user, string password, bool lockoutOnFailure)
        {
            return await _signInManager.CheckPasswordSignInAsync(user, password, lockoutOnFailure);
        }

        public async Task SignInAsync(User user, bool isPersistent)
        {
            await _signInManager.SignInAsync(user, isPersistent);
        }

        public async Task AddUserToRolesAsync(User user, List<string> roles)
        {
            await _userManager.AddToRolesAsync(user, roles);
        }

        public async Task AddUserRoles(string[] userRoles)
        {
            foreach (var role in userRoles)
            {
                if (!await _roleManager.RoleExistsAsync(role))
                {
                    await _roleManager.CreateAsync(new ApplicationRole
                    {
                        Name = role,
                        NormalizedName = role.ToUpper()
                    });
                }
            }
        }

        public async Task SignOutAsync()
        {
            await _signInManager.SignOutAsync();
        }

        public List<string> GetCurrentUserRoles()
        {
            var roleList = new List<string>();
            var claims = _httpContextAccessor.HttpContext.User.Claims.ToList();

            foreach (var claim in claims)
            {
                if (claim.Type == UserClaimsKey.Role)
                    roleList.Add(claim.Value);
            }

            return roleList;
        }
    }
}
