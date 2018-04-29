using System.Collections.Generic;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Entities.Entities;

namespace AwesomeCMSCore.Modules.Helper.Services
{
    public interface IUserService
    {
        Task<User> GetCurrentUserAsync();
        string GetCurrentUserGuid();
        string GetCurrentUserName();
        string GetCurrentUserEmail();
        List<string> GetCurrentRoles();
        bool IsAuthenticated();
    }
}
