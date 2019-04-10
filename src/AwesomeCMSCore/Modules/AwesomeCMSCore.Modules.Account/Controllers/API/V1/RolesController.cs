using System.Linq;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Account.Repositories;
using AwesomeCMSCore.Modules.Account.ViewModels;
using AwesomeCMSCore.Modules.Entities.ViewModel;
using AwesomeCMSCore.Modules.Helper.Filter;
using AwesomeCMSCore.Modules.Helper.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AwesomeCMSCore.Modules.Account.Controllers.API.V1
{
	[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
	[ApiVersion("1.0")]
	[ApiExplorerSettings(GroupName = "v1")]
	[Route("api/v{version:apiVersion}/Roles/")]
	public class RolesController : Controller
	{
		private readonly IAccountRepository _accountRepository;
		private readonly IUserService _userService;

		public RolesController(
			IAccountRepository accountRepository,
			IUserService userService)
		{
			_accountRepository = accountRepository;
			_userService = userService;
		}

		[HttpGet("")]
		public async Task<IActionResult> UserRoles()
		{
			var userRoles = await _accountRepository.GetUserRoles();
			return Ok(userRoles);
		}

		[HttpGet("{userId}")]
		public async Task<IActionResult> UserRole(string userId)
		{
			var userRolesById = await _accountRepository.GetUserRolesById(userId);
			return Ok(userRolesById);
		}

		[HttpPut("UserRoles"), ValidModel]
		public async Task<IActionResult> EditUserRoles([FromBody] RolesUserViewModel rolesUserVm)
		{
			var result = await _accountRepository.EditUserRoles(rolesUserVm);
			if (result)
			{
				return Ok();
			}

			return BadRequest();
		}

		[HttpPost("Manage"), ValidModel]
		public async Task<IActionResult> ManageRoles([FromBody] SelectOptionList roleList)
		{
			if (!roleList.SelectOptionViewModels.Any()) return BadRequest();
			await _accountRepository.ManageRoles(roleList);
			return Ok();
		}
	}
}
