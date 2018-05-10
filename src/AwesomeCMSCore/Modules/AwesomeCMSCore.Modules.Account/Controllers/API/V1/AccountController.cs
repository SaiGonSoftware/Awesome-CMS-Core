using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Account.Repositories;
using AwesomeCMSCore.Modules.Account.ViewModels;
using AwesomeCMSCore.Modules.Email;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Helper.Enum;
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
                return StatusCode(AccStatusCode.EmailNotConfirmed);
            }

            var result = await _userService.PasswordSignInAsync(model.Username, model.Password,
                model.RememberMe, true);

            if (result.Succeeded)
            {
                return Ok();
            }

            if (await _userService.GetAccessFailedCountAsync(user) == AccAppEnum.MaxFailedAccessAttempts)
            {
                await _userService.SetLockoutEnabledAsync(user, true);
            }
            
            if (result.IsLockedOut)
            {
                return StatusCode(AccStatusCode.Forbid);
            }

            return BadRequest();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterViewModel model, string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            if (ModelState.IsValid)
            {
                var user = new User { UserName = model.Email, Email = model.Email };
                var result = await _userService.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    var code = await _userService.GenerateEmailConfirmationTokenAsync(user);
                    //var callbackUrl = Url.EmailConfirmationLink(user.Id, code, Request.Scheme);
                    //await _emailSender.SendEmailConfirmationAsync(model.Email, callbackUrl);

                    await _userService.SignInAsync(user, isPersistent: false);
                    return Ok(returnUrl);
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userService.FindByEmailAsync(model.Email);
                if (user == null || !(await _userService.IsEmailConfirmedAsync(user)))
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    return NotFound();
                }

                // For more information on how to enable account confirmation and password reset please
                // visit https://go.microsoft.com/fwlink/?LinkID=532713
                var code = await _userService.GeneratePasswordResetTokenAsync(user);
                //var callbackUrl = Url.ResetPasswordCallbackLink(user.Id, code, Request.Scheme);
                //await _emailSender.SendEmailAsync(model.Email, "Reset Password",
                //   $"Please reset your password by clicking here: <a href='{callbackUrl}'>link</a>");
                return Ok();
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(model);
            }
            var user = await _userService.FindByEmailAsync(model.Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return Ok();
            }
            var result = await _userService.ResetPasswordAsync(user, model.Code, model.Password);
            if (result.Succeeded)
            {
                return Ok();
            }
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> UserList()
        {
            var userList = await _accountRepository.UserList();
            return Ok(userList);
        }

        [HttpGet]
        public async Task<IActionResult> UserRoles()
        {
            var userRoles = await _accountRepository.GetUserRoles();
            return Ok(userRoles);
        }

        [HttpGet]
        public async Task<IActionResult> GetUserRolesById(string userId)
        {
            var userRolesById = await _accountRepository.GetUserRolesById(userId);
            return Ok(userRolesById);
        }

        [HttpPost, ValidModel]
        public async Task<IActionResult> ValidateDuplicateAccountInfo([FromBody] UserAccountValidateObject accountValidateObject)
        {
            var isDuplicateAccountInfo = await _accountRepository.ValidateDuplicateAccountInfo(accountValidateObject);
            return Ok(isDuplicateAccountInfo);
        }

        [HttpPost, ValidModel]
        public async Task<IActionResult> AddNewUser([FromBody]UserInputViewModel userInputVm)
        {
            var result = await _accountRepository.AddNewUser(userInputVm);
            if (result)
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpPost, ValidModel]
        public async Task<IActionResult> ToggleAccountStatus([FromBody]AccountToggleViewModel accountToggleVm)
        {
            var result = await _accountRepository.AccountToggle(accountToggleVm);
            if (result)
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}
