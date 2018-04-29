using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Helper.Enum;
using AwesomeCMSCore.Modules.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace AwesomeCMSCore.Modules.Helper.Services
{
    public class UserService : IUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IGenericRepository<User> _userRepository;

        private readonly string _currentUserGuid;
        private readonly string _currentUserName;
        private readonly string _currentUserEmail;

        public UserService(
            UserManager<User> userManager,
            IHttpContextAccessor httpContextAccessor,
            IGenericRepository<User> userRepository)
        {
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
            _currentUserGuid = _httpContextAccessor?.HttpContext?.User?.FindFirst(UserClaimsKey.Sub)?.Value;
            _currentUserName = _httpContextAccessor?.HttpContext?.User?.Identity?.Name;
            _currentUserEmail = _currentUserGuid == null ? "" : userManager.FindByIdAsync(_currentUserGuid)?.Result?.Email;
        }

        public async Task<User> GetCurrentUserAsync()
        {
           return await _userRepository.GetByIdAsync(_currentUserGuid);
        }

        public string GetCurrentUserGuid()
        {
            return _currentUserGuid;
        }

        public string GetCurrentUserName()
        {
            return _currentUserName;
        }

        public string GetCurrentUserEmail()
        {
            return _currentUserEmail;
        }

        public bool IsAuthenticated()
        {
            return _httpContextAccessor.HttpContext.User.Identity.IsAuthenticated;
        }

        public List<string> GetCurrentRoles()
        {
            var roleList = new List<string>();
            var claims = _httpContextAccessor.HttpContext.User.Claims.ToList();

            foreach (var claim in claims)
            {
                if (claim.Type == UserClaimsKey.Role)
                    roleList.Add(claim.Value);
            }

            return roleList;
        }
    }
}
