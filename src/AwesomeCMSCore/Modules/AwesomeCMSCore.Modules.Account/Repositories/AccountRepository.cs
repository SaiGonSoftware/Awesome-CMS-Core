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
                                  select new UserViewModel
                                  {
                                      UserId = user.Id,
                                      UserName = user.UserName,
                                      Email= user.Email,
                                      EmailConfirmed= user.EmailConfirmed.ToString() 
                                      ,Groups = user.Groups.ToArray().ToString() 
                                  }).ToListAsync(); 
            return userList;
        }

        public async Task<IEnumerable<IdentityRole>> RoleList()
        {
            var roleList = await _unitOfWork.Repository<IdentityRole>().Query().ToListAsync();
            return roleList;
        }

        public async Task AccountToggle(AccountToggleViewModel accountToggleVm)
        {
            var account = await _unitOfWork.Repository<User>().Query().Where(acc => acc.Id == accountToggleVm.AccountId).FirstOrDefaultAsync();
            if (account != null)
            {
                account.EmailConfirmed = accountToggleVm.ToogleFlag;
                await _unitOfWork.Repository<User>().UpdateAsync(account);
            }
        }

        public async Task<IEnumerable<UserRoleViewModel>> GetUserRoles()
        {
            var rolesList = await _unitOfWork.Repository<IdentityRole>().Query().ToListAsync();
            return _mapper.Map<IEnumerable<UserRoleViewModel>>(rolesList);
        }

        public async Task AddNewUser(UserInputViewModel userInputVm)
        {
            var user = new User { UserName = userInputVm.Username, Email = userInputVm.Email };
            var result = await _userManager.CreateAsync(user, "P@ssw0rd");
            if (result.Succeeded)
            {
                await _userManager.AddToRolesAsync(user, userInputVm.Roles);
            }
        }
    }
}
