using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Account.ViewModels;

namespace AwesomeCMSCore.Modules.Account.Repositories
{
    public interface IAccountRepository
    {
        Task<IEnumerable<UserViewModel>> UserList();
    }
}
