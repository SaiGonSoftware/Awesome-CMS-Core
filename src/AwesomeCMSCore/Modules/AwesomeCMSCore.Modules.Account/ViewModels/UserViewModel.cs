using System;
using System.Collections.Generic;
using System.Text;

namespace AwesomeCMSCore.Modules.Account.ViewModels
{
    public class UserViewModel
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed{ get; set; }
        public List<string> Roles { get; set; }
}
}
