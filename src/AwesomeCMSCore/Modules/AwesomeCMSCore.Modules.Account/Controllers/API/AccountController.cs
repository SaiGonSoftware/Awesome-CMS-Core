using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Account.Services;
using AwesomeCMSCore.Modules.Account.ViewModels;
using AwesomeCMSCore.Modules.Email;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Helper.Extensions;
using AwesomeCMSCore.Modules.Helper.Filter;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AwesomeCMSCore.Modules.Account.Controllers.API
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IEmailSender _emailSender;
        private readonly IAccountService _accountService;

        public AccountController(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IEmailSender emailSender,
            IAccountService accountService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _emailSender = emailSender;
            _accountService = accountService;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            var result = await _signInManager.PasswordSignInAsync(model.Username, model.Password,
                model.RememberMe, true);

            if (result.Succeeded)
            {
                return Ok();
            }
            if (result.IsLockedOut)
            {
                return Forbid();
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
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    //var callbackUrl = Url.EmailConfirmationLink(user.Id, code, Request.Scheme);
                    //await _emailSender.SendEmailConfirmationAsync(model.Email, callbackUrl);

                    await _signInManager.SignInAsync(user, isPersistent: false);
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
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    return NotFound();
                }

                // For more information on how to enable account confirmation and password reset please
                // visit https://go.microsoft.com/fwlink/?LinkID=532713
                var code = await _userManager.GeneratePasswordResetTokenAsync(user);
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
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return Ok();
            }
            var result = await _userManager.ResetPasswordAsync(user, model.Code, model.Password);
            if (result.Succeeded)
            {
                return Ok();
            }
            return Ok();
        }

        public async Task<IActionResult> UserList()
        {
            var userList = await _accountService.UserList();
            return Ok(userList);
        }

        public async Task<IActionResult> UserRoles()
        {
            var userRoles = await _accountService.GetUserRoles();
            return Ok(userRoles);
        }

        public async Task<IActionResult> ValidateDuplicateUserName([FromBody]string username)
        {
            if (string.IsNullOrEmpty(username))
            {
                return BadRequest();
            }

            var isDuplicateUserName = await _accountService.ValidateDuplicateUserName(username);
            return Ok(isDuplicateUserName);
        }

        public async Task<IActionResult> ValidateDuplicateEmail([FromBody]string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest();
            }

            var isDuplicateEmail = await _accountService.ValidateDuplicateEmail(email);
            return Ok(isDuplicateEmail);
        }

        [HttpPost, ValidModel]
        public async Task<IActionResult> AddNewUser([FromBody]UserInputViewModel userInputVm)
        {
            var result = await _accountService.AddNewUser(userInputVm);
            if (result)
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpPost, ValidModel]
        public async Task<IActionResult> ToggleAccountStatus([FromBody]AccountToggleViewModel accountToggleVm)
        {
            var result = await _accountService.AccountToggle(accountToggleVm);
            if (result)
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}
