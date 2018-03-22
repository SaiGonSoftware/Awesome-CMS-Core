using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace AwesomeCMSCore.Modules.Helper.Services
{
    public class UserService : IUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IGenericRepository<User> _userRepository;
        private readonly UserManager<User> _userManager;

        private readonly string _currentUserGuid;
        private readonly string _currentUserName;
        private readonly List<string> _currentUserRoles;

        public UserService(
            UserManager<User> userManager,
            IHttpContextAccessor httpContextAccessor,
            IGenericRepository<User> userRepository)
        {
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
            _currentUserGuid = GetCurrentUserClaims().UserId;
            _currentUserName = GetCurrentUserClaims().UserName;
            _currentUserRoles = GetCurrentUserClaims().UserRoles;
        }

        public async Task<User> GetCurrentUserAsync()
        {
           return await _userRepository.GetByIdAsync(_currentUserGuid);
        }

        public string GetCurrentUserGuid()
        {
            return _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }

        public string GetCurrentUserName()
        {
            return _httpContextAccessor.HttpContext.User.Identity.Name;
        }

        public List<string> GetCurrentUserRole()
        {
            return _currentUserRoles;
        }

        private UserClaims GetCurrentUserClaims()
        {
            var userClaims = new UserClaims();
            var claims = _httpContextAccessor.HttpContext.User.Claims.ToList();
            foreach (var claim in claims)
            {
                switch (claim.Type)
                {
                    case UserClaimsKey.Sub:
                        userClaims.UserId = claim.Value;
                        break;
                    case UserClaimsKey.Name:
                        userClaims.UserName = claim.Value;
                        break;
                    case UserClaimsKey.Role:
                        userClaims.UserRoles.Add(claim.Value);
                        break;
                }
            }

            return userClaims;
        }
    }
}
