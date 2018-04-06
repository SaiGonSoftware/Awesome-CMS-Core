using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AwesomeCMSCore.Modules.Account.ViewModels;
using AwesomeCMSCore.Modules.Entities.Data;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Helper.Services;
using AwesomeCMSCore.Modules.Repositories;
using Microsoft.AspNetCore.Identity;

namespace AwesomeCMSCore.Modules.Account.Services
{
    public class AccountService : IAccountService
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;

        public AccountService(
            IUserService userService,
            IMapper mapper,
            IUnitOfWork unitOfWork,
            UserManager<User> userManager,
            ApplicationDbContext context)
        {
            _userService = userService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _context = context;
            _userManager = userManager;
        }

        public async Task<IEnumerable<UserViewModel>> UserList()
        {
            var userList = (from user in _context.Users
                                  select new
                                  {
                                      UserId = user.Id,
                                      Username = user.UserName,
                                      Email = user.Email,
                                      EmailConfirmed = user.EmailConfirmed,
                                      RoleNames = (from userRole in user.Roles
                                                   join role in _context.Roles on userRole.RoleId
                                                       equals role.Id
                                                   select role.Name).ToList()
                                  }).ToList().Select(p => new UserViewModel
                                  {
                                      UserId = p.UserId,
                                      UserName = p.Username,
                                      Email = p.Email,
                                      Roles = string.Join(",", p.RoleNames),
                                      EmailConfirmed = p.EmailConfirmed
                                  });
            return userList;
        }
    }
}
