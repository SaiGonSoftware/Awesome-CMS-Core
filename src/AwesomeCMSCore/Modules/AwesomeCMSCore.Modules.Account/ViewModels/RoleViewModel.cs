using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AwesomeCMSCore.Modules.Account.ViewModels
{ 
        public class RoleViewModel
        {
            public string Id { get; set; }
            [Required(AllowEmptyStrings = false)]
            [Display(Name = "Role Name")]
            public string Name { get; set; }
        } 
}
