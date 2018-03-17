using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Entities.Entities;

namespace AwesomeCMSCore.Modules.Helper.Services
{
    public interface IUserService
    {
        Task<User> GetCurrentUserAsync();
        Task<string> GetCurrentUserGuidAsync();
        Task<string> GetCurrentUserIdAsync();
        Task<string> GetCurrentUserNameAsync();
        Task<IEnumerable<string>> GetCurrentUserRole();
    }
}
