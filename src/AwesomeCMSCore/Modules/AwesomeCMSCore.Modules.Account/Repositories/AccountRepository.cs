using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AwesomeCMSCore.Modules.Account.ViewModels;
using AwesomeCMSCore.Modules.Entities.Data;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Helper.Extensions;
using AwesomeCMSCore.Modules.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using AwesomeCMSCore.Modules.Email;
using AwesomeCMSCore.Modules.Helper.Enum;

namespace AwesomeCMSCore.Modules.Account.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IEmailSender _emailSender;
        private readonly IUrlHelperExtension _urlHelperExtension;
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;

        public AccountRepository(
            IMapper mapper,
            IUnitOfWork unitOfWork,
            IHttpContextAccessor httpContextAccessor,
            IEmailSender emailSender,
            IUrlHelperExtension urlHelperExtension,
            ApplicationDbContext context,
            UserManager<User> userManager)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _httpContextAccessor = httpContextAccessor;
            _emailSender = emailSender;
            _urlHelperExtension = urlHelperExtension;
            _context = context;
            _userManager = userManager;
        }

        public async Task<IEnumerable<UserViewModel>> UserList()
        {
            var userList = await (from user in _context.Users
                                  select new UserViewModel
                                  {
                                      UserId = user.Id,
                                      UserName = user.UserName,
                                      Email= user.Email,
                                      EmailConfirmed= user.EmailConfirmed.ToString() 
                                  }).ToListAsync();

            
            return userList;
        }

        public async Task<bool> AccountToggle(AccountToggleViewModel accountToggleVm)
        {
            var account = await _unitOfWork.Repository<User>().Query().Where(acc => acc.Id == accountToggleVm.AccountId).FirstOrDefaultAsync();
            if (account == null)
            {
                return false;
            }

            account.EmailConfirmed = accountToggleVm.ToogleFlag;
            await _unitOfWork.Repository<User>().UpdateAsync(account);

            return true;
        }

        public async Task<IEnumerable<UserRoleViewModel>> GetUserRoles()
        {
            var rolesList = await _unitOfWork.Repository<IdentityRole>().Query().ToListAsync();
            return _mapper.Map<IEnumerable<UserRoleViewModel>>(rolesList);
        }

        public async Task<bool> AddNewUser(UserInputViewModel userInputVm)
        {
            var user = new User { UserName = userInputVm.Username, Email = userInputVm.Email };
            var randomPassword = RandomString.GenerateRandomString();
            var result = await _userManager.CreateAsync(user, randomPassword);

            if (!result.Succeeded)
            {
                return false;
            }

            await _userManager.AddToRolesAsync(user, userInputVm.Roles);

            var context = _httpContextAccessor.HttpContext;
            var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var callbackUrl = _urlHelperExtension.EmailConfirmationLink(user.Id, code, context.Request.Scheme);
            var emailOptions = new EmailOptions
            {
                Url = callbackUrl,
                Password = randomPassword,
                UserName = userInputVm.Username
            };

            await _emailSender.SendEmailAsync(userInputVm.Email, "", emailOptions, EmailType.AccountConfirm);

            return true;
        }

        public async Task<bool> ValidateDuplicateAccountInfo(UserAccountValidateObject accountValidateObject)
        {
            switch (accountValidateObject.Key)
            {
                case "UserName":
                    var isUserNameDuplicate = await _unitOfWork.Repository<User>().Query().Where(acc =>
                            acc.UserName.Equals(accountValidateObject.Value, StringComparison.CurrentCultureIgnoreCase))
                        .AnyAsync();
                    return isUserNameDuplicate;
                case "Email":
                    var isEmailDuplicate = await _unitOfWork.Repository<User>().Query().Where(acc =>
                            acc.Email.Equals(accountValidateObject.Value, StringComparison.CurrentCultureIgnoreCase))
                        .AnyAsync();
                    return isEmailDuplicate;
                default:
                    return false;
            }
        }
    }
}
