using System;
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
		private readonly IUnitOfWork _unitOfWork;
		private readonly UserManager<User> _userManager;
		private readonly SignInManager<User> _signInManager;
		private readonly RoleManager<ApplicationRole> _roleManager;

		private readonly string _currentUserGuid;
		private readonly string _currentUserName;
		private readonly string _currentUserEmail;

		public UserService(
			IHttpContextAccessor httpContextAccessor,
			IUnitOfWork unitOfWork,
			UserManager<User> userManager,
			SignInManager<User> signInManager,
			RoleManager<ApplicationRole> roleManager)
		{
			_httpContextAccessor = httpContextAccessor;
			_unitOfWork = unitOfWork;
			_userManager = userManager;
			_signInManager = signInManager;
			_roleManager = roleManager;
			_currentUserGuid = _httpContextAccessor?.HttpContext?.User?.FindFirst(UserClaimsKey.Sub)?.Value;
			_currentUserName = _httpContextAccessor?.HttpContext?.User?.Identity?.Name;
			_currentUserEmail = _currentUserGuid == null ? "" : userManager.FindByIdAsync(_currentUserGuid)?.Result?.Email;
		}

		public UserService()
		{
			_httpContextAccessor = new HttpContextAccessor();
		}

		#region User
		public async Task<User> GetCurrentUserAsync()
		{
			return await _unitOfWork.Repository<User>().GetByUniqueIdAsync(_currentUserGuid);
		}

		public async Task<IEnumerable<User>> GetAllUser()
		{
			return await _unitOfWork.Repository<User>().GetAll().AsQueryable().ToListAsync();
		}

		public async Task<IEnumerable<string>> GetAllUserIds()
		{
			return await _unitOfWork.Repository<User>().Query().Select(u => u.Id).ToListAsync();
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
		#endregion

		#region User info, user account
		public async Task<User> GetUserAsync(ClaimsPrincipal principal)
		{
			return await _userManager.GetUserAsync(principal);
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
			return await _userManager.ResetPasswordAsync(user, code, password);
		}

		public async Task<IdentityResult> ConfirmEmailAsync(User user, string code)
		{
			return await _userManager.ConfirmEmailAsync(user, code);
		}

		public async Task<SignInResult> PasswordSignInAsync(string username, string password, bool rememberMe, bool lockoutOnFailure)
		{
			return await _signInManager.PasswordSignInAsync(username, password, rememberMe, lockoutOnFailure);
		}

		public async Task<ClaimsPrincipal> CreateUserPrincipalAsync(User user)
		{
			return await _signInManager.CreateUserPrincipalAsync(user);
		}

		public async Task SaveResetPasswordRequest(string token, string email)
		{
			var passwordRequest = new PasswordRequest
			{
				Token = token,
				Email = email,
				IsActive = true
			};

			await _unitOfWork.Repository<PasswordRequest>().AddAsync(passwordRequest);
		}

		public async Task<string> GenerateEmailConfirmationTokenAsync(User user)
		{
			return await _userManager.GenerateEmailConfirmationTokenAsync(user);
		}

		public async Task<string> GeneratePasswordResetTokenAsync(User user)
		{
			return await _userManager.GeneratePasswordResetTokenAsync(user);
		}

		public async Task<int> GetAccessFailedCountAsync(User user)
		{
			return await _userManager.GetAccessFailedCountAsync(user);
		}

		public async Task ToggleRequestPasswordStatusByEmail(string email)
		{
			var passwordRequests = await _unitOfWork.Repository<PasswordRequest>().Query()
				.Where(rq => rq.Email.Equals(email, StringComparison.OrdinalIgnoreCase) && rq.IsActive)
				.ToListAsync();

			foreach (var passwordRequest in passwordRequests)
			{
				passwordRequest.IsActive = false;
				await _unitOfWork.Repository<PasswordRequest>().UpdateAsync(passwordRequest);
			}
		}
		#endregion

		#region Roles
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

		public async Task RemoveFromRolesAsync(User user, string roles)
		{
			await _userManager.RemoveFromRoleAsync(user, roles);
		}

		public async Task RemoveFromRolesAsync(User user, string[] roles)
		{
			await _userManager.RemoveFromRolesAsync(user, roles);
		}

		public IEnumerable<string> GetCurrentUserRoles()
		{
			var claims = _httpContextAccessor.HttpContext.User.Claims.ToList();

			foreach (var claim in claims)
			{
				if (claim.Type == UserClaimsKey.Role)
					yield return claim.Value;
			}
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

		public async Task<List<User>> GetListRoleOfUser(string role)
		{
			var userList = await _userManager.GetUsersInRoleAsync(role);
			return userList.ToList();
		}
		#endregion

		#region Validate
		public async Task<bool> CanSignInAsync(User user)
		{
			return await _signInManager.CanSignInAsync(user);
		}

		public async Task<bool> IsEmailConfirmedAsync(User user)
		{
			return await _userManager.IsEmailConfirmedAsync(user);
		}

		public async Task<bool> IsLockedOutAsync(User user)
		{
			return await _userManager.IsLockedOutAsync(user);
		}

		public async Task<bool> CheckValidResetPasswordToken(string token, string email)
		{
			var passwordRequest = await _unitOfWork.Repository<PasswordRequest>().Query()
										.Where(rq => rq.Email.Equals(email, StringComparison.OrdinalIgnoreCase)
										&& rq.Token.Equals(token, StringComparison.OrdinalIgnoreCase)
										&& rq.IsActive).SingleOrDefaultAsync();
			return passwordRequest != null;
		}

		public async Task<SignInResult> CheckPasswordSignInAsync(User user, string password, bool lockoutOnFailure)
		{
			return await _signInManager.CheckPasswordSignInAsync(user, password, lockoutOnFailure);
		}

		public async Task SignInAsync(User user, bool isPersistent)
		{
			await _signInManager.SignInAsync(user, isPersistent);
		}

		public async Task SignOutAsync()
		{
			await _signInManager.SignOutAsync();
		}

		public bool IsAuthenticated()
		{
			return _httpContextAccessor.HttpContext.User.Identity.IsAuthenticated;
		}
		#endregion
	}
}
