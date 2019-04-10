using System;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Email;
using AwesomeCMSCore.Modules.Helper.Enum;
using AwesomeCMSCore.Modules.Helper.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AwesomeCMSCore.Modules.Account.Controllers
{
	[Authorize]
	public class AccountController : Controller
	{
		private readonly IEmailSender _emailSender;
		private readonly IUserService _userService;
		public AccountController(
			IEmailSender emailSender,
			IUserService userService)
		{
			_emailSender = emailSender;
			_userService = userService;
		}

		public IActionResult Index()
		{
			return View();
		}

		[HttpGet]
		[AllowAnonymous]
		public async Task<IActionResult> Login()
		{
			if (_userService.IsAuthenticated())
			{
				return RedirectToAction("Index", "Portal");
			}
			await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);
			return View();
		}

		[HttpGet]
		[AllowAnonymous]
		public IActionResult Lockout()
		{
			return View();
		}

		[HttpGet]
		[AllowAnonymous]
		public IActionResult Register(string returnUrl = null)
		{
			ViewData["ReturnUrl"] = returnUrl;
			return View();
		}

		[HttpGet]
		public async Task<IActionResult> Logout()
		{
			await _userService.SignOutAsync();
			return RedirectToAction("Login");
		}

		[HttpGet]
		[AllowAnonymous]
		public async Task<IActionResult> ConfirmEmail(string userId, string code)
		{
			if (userId == null || code == null)
			{
				return RedirectToAction("Login");
			}
			var user = await _userService.FindByIdAsync(userId);
			if (user == null)
			{
				throw new ApplicationException($"Unable to load user with ID '{userId}'.");
			}
			var result = await _userService.ConfirmEmailAsync(user, code);
			return View(result.Succeeded ? "ConfirmEmail" : "Error");
		}

		[HttpGet]
		[AllowAnonymous]
		public IActionResult ForgotPassword()
		{
			return View();
		}

		[AllowAnonymous]
		public async Task<IActionResult> RequestResetPassword(string token, string email)
		{
			if (token == null || email == null)
			{
				return RedirectToAction("Index", "Error", new { statusCode = AppStatusCode.NotFound });
			}

			var isResetTokenValid = await _userService.CheckValidResetPasswordToken(token, email);
			if (!isResetTokenValid)
			{
				return RedirectToAction("Index", "Error", new { statusCode = AppStatusCode.NotFound });
			}

			return View();
		}

		[HttpGet]
		[AllowAnonymous]
		public IActionResult ResetPasswordConfirmation()
		{
			return View();
		}

		[HttpGet]
		public IActionResult AccessDenied()
		{
			return View();
		}
	}
}
