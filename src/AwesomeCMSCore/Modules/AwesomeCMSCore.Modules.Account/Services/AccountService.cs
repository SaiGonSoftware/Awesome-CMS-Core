using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AwesomeCMSCore.Modules.Account.ViewModels;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Helper.Services;
using AwesomeCMSCore.Modules.Repositories;

namespace AwesomeCMSCore.Modules.Account.Services
{
    public class AccountService : IAccountService
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public AccountService(
            IUserService userService,
            IMapper mapper,
            IUnitOfWork unitOfWork)
        {
            _userService = userService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<List<UserViewModel>> UserList()
        {
            var userList = _unitOfWork.Repository<User>().Filter(null);
            var userListVm = _mapper.Map<List<User>, List<UserViewModel>>(userList.ToList());
            return userListVm;
        }
    }
}
