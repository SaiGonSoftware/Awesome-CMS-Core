using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AwesomeCMSCore.Modules.Account.ViewModels
{
    public class AccountToggleViewModel
    {
        [Required]
        public string AccountId { get; set; }
        [Required]
        public bool ToogleFlag { get; set; }
    }
}
