using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Account.ViewModels;

namespace AwesomeCMSCore.Modules.Account.Services
{
    public interface IAccountService
    {
        Task<List<UserViewModel>> UserList();
    }
}
