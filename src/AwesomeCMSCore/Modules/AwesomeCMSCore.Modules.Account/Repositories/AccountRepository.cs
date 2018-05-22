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
using Microsoft.AspNetCore.Http;
using AwesomeCMSCore.Modules.Email;
using AwesomeCMSCore.Modules.Helper.Services;

namespace AwesomeCMSCore.Modules.Account.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IEmailSender _emailSender;
        private readonly IUrlHelperExtension _urlHelperExtension;
        private readonly IUserService _userService;
        private readonly ApplicationDbContext _context;

        public AccountRepository(
            IMapper mapper,
            IUnitOfWork unitOfWork,
            IHttpContextAccessor httpContextAccessor,
            IEmailSender emailSender,
            IUrlHelperExtension urlHelperExtension,
            IUserService userService,
            ApplicationDbContext context)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _httpContextAccessor = httpContextAccessor;
            _emailSender = emailSender;
            _urlHelperExtension = urlHelperExtension;
            _userService = userService;
            _context = context;
        }

        public async Task<IEnumerable<UserViewModel>> UserList()
        {
            var userList = await (from user in _context.Users
                                  select new
                                  {
                                      UserId = user.Id,
                                      Username = user.UserName,
                                      user.Email,
                                      user.EmailConfirmed,
                                      RoleNames = (from userRole in user.Roles //[AspNetUserRoles]
                                                   join role in _context.Roles //[AspNetRoles]//
                                                   on userRole.RoleId
                                                   equals role.Id
                                                   select role.Name).ToList()
                                  }).ToListAsync();

            var userListVm = userList.Select(p => new UserViewModel
            {
                UserId = p.UserId,
                UserName = p.Username,
                Email = p.Email,
                Roles = string.Join(",", p.RoleNames),
                EmailConfirmed = p.EmailConfirmed.ToString()
            });

            return userListVm;
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

        public async Task<IEnumerable<string>> GetUserRolesName()
        {
            return await _unitOfWork.Repository<IdentityRole>().Query().Select(r=>r.Name).ToListAsync();
        }

        public async Task<bool> AddNewUser(UserInputViewModel userInputVm)
        {
            var user = new User { UserName = userInputVm.Username, Email = userInputVm.Email };
            var randomPassword = RandomString.GenerateRandomString();
            var result = await _userService.CreateAsync(user, randomPassword);

            if (!result.Succeeded)
            {
                return false;
            }

            await _userService.AddUserToRolesAsync(user, userInputVm.Roles);

            var context = _httpContextAccessor.HttpContext;
            var code = await _userService.GenerateEmailConfirmationTokenAsync(user);
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

        public async Task<RolesUserViewModel> GetUserRolesById(string userId)
        {
            var userRoles = await _userService.GetUserRolesByGuid(userId);
            var roles = await GetUserRolesName();

            var roleUserVm = new RolesUserViewModel
            {
                CurrentUserRoles =  userRoles,
                RolesName = roles
            };

            return roleUserVm;
        }
    }
}
