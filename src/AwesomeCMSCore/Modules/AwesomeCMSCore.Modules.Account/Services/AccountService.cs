using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AwesomeCMSCore.Modules.Account.Repositories;
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
        private readonly IAccountRepository _accountRepository;
        private readonly UserManager<User> _userManager;

        public AccountService(
            IUserService userService,
            IMapper mapper,
            IUnitOfWork unitOfWork,
            IAccountRepository accountRepository,
            UserManager<User> userManager)
        {
            _userService = userService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _accountRepository = accountRepository;
            _userManager = userManager;
        }

        public async Task<IEnumerable<UserViewModel>> UserList()
        {
            return await _accountRepository.UserList();
        }

        public async Task<bool> AccountToggle(AccountToggleViewModel accountToggleVm)
        {
            return await _accountRepository.AccountToggle(accountToggleVm);
        }

        public async Task<IEnumerable<UserRoleViewModel>> GetUserRoles()
        {
            return await _accountRepository.GetUserRoles();
        }

        public async Task<bool> AddNewUser(UserInputViewModel userInputVm)
        {
            return await _accountRepository.AddNewUser(userInputVm);
        }

        public async Task<bool> ValidateDuplicateUserName(string username)
        {
            return await _accountRepository.ValidateDuplicateUserName(username);
        }

        public async Task<bool> ValidateDuplicateEmail(string email)
        {
            return await _accountRepository.ValidateDuplicateUserName(email);
        }
    }
}
