using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AwesomeCMSCore.Modules.Account.Extensions;
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

namespace AwesomeCMSCore.Modules.Account.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUrlHelper _urlHelper;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IEmailSender _emailSender;
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;

        public AccountRepository(
            IMapper mapper,
            IUnitOfWork unitOfWork,
            IUrlHelper urlHelper,
            IHttpContextAccessor httpContextAccessor,
            IEmailSender emailSender,
            ApplicationDbContext context,
            UserManager<User> userManager)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _urlHelper = urlHelper;
            _httpContextAccessor = httpContextAccessor;
            _emailSender = emailSender;
            _context = context;
            _userManager = userManager;
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
            if (account == null) return false;
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
            var result = await _userManager.CreateAsync(user, RandomString.GenerateRandomString());
            if (!result.Succeeded) return false;
            var context = _httpContextAccessor.HttpContext;
            await _userManager.AddToRolesAsync(user, userInputVm.Roles);
            var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var callbackUrl = _urlHelper.EmailConfirmationLink(user.Id, code, context.Request.Scheme);
            await _emailSender.SendEmailAsync(userInputVm.Email, "", callbackUrl, EmailType.AccountConfirm);
            return true;

        }
    }
}
