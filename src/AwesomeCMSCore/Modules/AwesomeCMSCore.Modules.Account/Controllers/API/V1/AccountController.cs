using System.Linq;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Account.Repositories;
using AwesomeCMSCore.Modules.Account.ViewModels;
using AwesomeCMSCore.Modules.Email;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Entities.ViewModel;
using AwesomeCMSCore.Modules.Helper.Enum;
using AwesomeCMSCore.Modules.Helper.Extensions;
using AwesomeCMSCore.Modules.Helper.Filter;
using AwesomeCMSCore.Modules.Helper.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
        private readonly IUrlHelperExtension _urlHelper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AccountController(
            IEmailSender emailSender,
            IAccountRepository accountRepository,
            IUserService userService,
            IUrlHelperExtension urlHelper,
            IHttpContextAccessor httpContextAccessor)
        {
            _emailSender = emailSender;
            _accountRepository = accountRepository;
            _userService = userService;
            _urlHelper = urlHelper;
            _httpContextAccessor = httpContextAccessor;
        }

        #region Login, Register, Password
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

            if (await _userService.GetAccessFailedCountAsync(user) == AppEnum.MaxFailedAccessAttempts)
            {
                await _userService.SetLockoutEnabledAsync(user, true);
            }

            if (result.IsLockedOut)
            {
                return StatusCode(AppStatusCode.Forbid);
            }

            return BadRequest();
        }

        //no need now will update later
        [HttpPost, AllowAnonymous, ValidModel]
        public async Task<IActionResult> Register(RegisterViewModel model, string returnUrl = null)
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

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        [HttpPost, AllowAnonymous, ValidModel]
        public async Task<IActionResult> ForgotPassword([FromBody]ForgotPasswordViewModel model)
        {
            var user = await _userService.FindByEmailAsync(model.Email);
            if (user == null || !(await _userService.IsEmailConfirmedAsync(user)))
            {
                return Ok();
            }

            var token = await _userService.GeneratePasswordResetTokenAsync(user);

            await _userService.ToggleRequestPasswordStatusByEmail(model.Email);
            await _userService.SaveResetPasswordRequest(token, model.Email);

            var callbackUrl = _urlHelper.ResetPasswordCallbackLink(model.Email, token, Request.Scheme);
            var emailOptions = new EmailOptions
            {
                Url = callbackUrl,
                Token = token
            };

            await _emailSender.SendEmailAsync(model.Email, "", emailOptions, EmailType.ForgotPassword);

            return Ok();
        }

        [HttpPost, ValidModel, AllowAnonymous]
        public async Task<IActionResult> ResetPassword([FromBody]ResetPasswordViewModel model)
        {
            if (string.IsNullOrEmpty(model.Token) || string.IsNullOrEmpty(model.Email))
            {
                return RedirectToAction("Index", "Error", new { statusCode = AppStatusCode.NotFound });
            }
            
            var isResetTokenValid = await _userService.CheckValidResetPasswordToken(model.Token, model.Email);

            if (!isResetTokenValid || string.IsNullOrEmpty(model.Email))
            {
                return StatusCode(AppStatusCode.ResetPassTokenExpire);
            }

            var user = await _userService.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return Ok();
            }

            await _userService.ResetPasswordAsync(user, model.Token, model.Password);
            return Ok();
        }
        #endregion

        #region User Roles 
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
        public async Task<IActionResult> EditUserRoles([FromBody] RolesUserViewModel rolesUserVm)
        {
            var result = await _accountRepository.EditUserRoles(rolesUserVm);
            if (result)
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpPost,ValidModel]
        public async Task<IActionResult> ManageRoles([FromBody] SelectOptionList roleList)
        {
            if (!roleList.SelectOptionViewModels.Any()) return BadRequest();
            await _accountRepository.ManageRoles(roleList);
            return Ok();
        }
        #endregion

        #region Account
        [HttpGet]
        public async Task<IActionResult> UserList()
        {
            var userList = await _accountRepository.UserList();
            return Ok(userList);
        }
        
        [HttpPost, ValidModel]
        public async Task<IActionResult> ValidateDuplicateAccountInfo([FromBody] UserAccountValidateObject accountValidateObject)
        {
            var isDuplicateAccountInfo = await _accountRepository.ValidateDuplicateAccountInfo(accountValidateObject);
            return Ok(isDuplicateAccountInfo);
        }

        [HttpPost, ValidModel]
        public async Task<IActionResult> AddNewUser([FromBody] UserInputViewModel userInputVm)
        {
            var result = await _accountRepository.AddNewUser(userInputVm);
            if (result)
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpPost, ValidModel]
        public async Task<IActionResult> ToggleAccountStatus([FromBody] AccountToggleViewModel accountToggleVm)
        {
            var result = await _accountRepository.AccountToggle(accountToggleVm);
            if (result)
            {
                return Ok();
            }

            return BadRequest();
        }
        #endregion
    }
}
