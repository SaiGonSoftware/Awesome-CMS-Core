using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Entities.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace AwesomeCMSCore.Modules.Helper.Services
{
    public class UserService : IUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<User> _userManager;

        public UserService(
            UserManager<User> userManager,
            IHttpContextAccessor httpContextAccessor)
        {
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
        }

        public Task<User> GetCurrentUserAsync()
        {
            throw new NotImplementedException();
        }

        public Task<string> GetCurrentUserGuidAsync()
        {
            throw new NotImplementedException();
        }

        public Task<string> GetCurrentUserIdAsync()
        {
            var data = _httpContextAccessor.HttpContext.User.Identity.Name;

            var data1 = _httpContextAccessor.HttpContext.User.Identities.ToList();
            //foreach (var VARIABLE in data1)
            //{
            //    var name = VARIABLE.Name;
            //}
            var data2 = _httpContextAccessor.HttpContext.User.Claims.ToList();
            GetCurrentUserClaims();
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return Task.FromResult(userId);
        }

        public Task<string> GetCurrentUserNameAsync()
        {
            var username = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Name).Value;
            return Task.FromResult(username);
        }

        public Task<IEnumerable<string>> GetCurrentUserRole()
        {
            throw new NotImplementedException();
        }

        private void GetCurrentUserClaims()
        {
            var userClaims = new UserClaims();
            var claims = _httpContextAccessor.HttpContext.User.Claims.ToList();
            foreach (var claim in claims)
            {
                switch (claim.Type)
                {
                    case "sub":
                        userClaims.UserId = claim.Value;
                        break;
                    case "name":
                        userClaims.UserName = claim.Value;
                        break;
                    case "role":
                        userClaims.UserRoles.Add(claim.Value);
                        break;
                    default:
                        break;
                }
            }

            var data = userClaims;
        }
    }
}
