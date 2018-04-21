using System;
using System.Collections.Generic;
using System.Text;

namespace AwesomeCMSCore.Modules.Account.ViewModels
{
    public class UserViewModel
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string EmailConfirmed{ get; set; }
        public string Groups { get; set; }
    }
}
