using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AwesomeCMSCore.Modules.Account.ViewModels
{
    public class RoleViewModel
    {
        [Required]
        public string [] RoleData { get; set; }
        public string RoleOptions { get; set; }
    }
}
