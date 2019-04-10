using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Account.Repositories;
using AwesomeCMSCore.Modules.Account.ViewModels;
using AwesomeCMSCore.Modules.Email;
using AwesomeCMSCore.Modules.Helper.Enum;
using AwesomeCMSCore.Modules.Helper.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AwesomeCMSCore.Modules.Account.Controllers.API.V2
{
	[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
	[ApiVersion("2.0")]
	[ApiExplorerSettings(GroupName = "v2")]
	[Route("api/v{version:apiVersion}/account/[action]")]
	public class AccountController : Controller
	{
		private readonly IEmailSender _emailSender;
		private readonly IAccountRepository _accountRepository;
		private readonly IUserService _userService;

		public AccountController(
			IEmailSender emailSender,
			IAccountRepository accountRepository,
			IUserService userService)
		{
			_emailSender = emailSender;
			_accountRepository = accountRepository;
			_userService = userService;
		}

		[HttpPost]
		[AllowAnonymous]
		public async Task<IActionResult> Login([FromBody] LoginViewModel model)
		{
			var user = await _userService.FindByNameAsync(model.Username);
			if (!user.EmailConfirmed)
			{
				return StatusCode(AppStatusCode.EmailNotConfirmed);
			}

			var result = await _userService.PasswordSignInAsync(model.Username, model.Password,
				model.RememberMe, true);

			if (result.Succeeded)
			{
				return Ok();
			}

			await _userService.SetLockoutEnabledAsync(user, true);

			if (result.IsLockedOut)
			{
				return StatusCode(AppStatusCode.Forbid);
			}

			return BadRequest();
		}
	}
}
