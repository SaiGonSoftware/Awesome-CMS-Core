using System;
using System.Collections.Generic;
using System.Text;

namespace AwesomeCMSCore.Modules.Entities.Entities
{
    /// <summary>
    /// This class will store current login User info from HttpContext
    /// </summary>
    public class UserClaims
    {
        public string UserName { get; set; }
        public string UserId { get; set; }
        public List<string> UserRoles = new List<string>();
    }
}
