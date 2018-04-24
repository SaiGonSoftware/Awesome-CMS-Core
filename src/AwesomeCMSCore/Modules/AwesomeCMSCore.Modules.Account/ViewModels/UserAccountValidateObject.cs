using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AwesomeCMSCore.Modules.Account.ViewModels
{
    public class UserAccountValidateObject
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Email { get; set; }
    }
}
