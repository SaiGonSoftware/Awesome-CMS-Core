using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AwesomeCMSCore.Modules.Account.ViewModels;
using AwesomeCMSCore.Modules.Entities.Data;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Helper.Extensions;
using AwesomeCMSCore.Modules.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AwesomeCMSCore.Modules.Account.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;

        public AccountRepository(
            IMapper mapper,
            IUnitOfWork unitOfWork,
            ApplicationDbContext context,
            UserManager<User> userManager)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
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
            await _userManager.AddToRolesAsync(user, userInputVm.Roles);
            return true;
        }
    }
}
