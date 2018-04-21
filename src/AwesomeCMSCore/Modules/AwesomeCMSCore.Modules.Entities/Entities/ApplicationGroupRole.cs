using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AwesomeCMSCore.Modules.Entities.Entities
{
    public class ApplicationGroupRole
    { 
        [Required]
        public string RoleId { get; set; }
        [Required]
        public string GroupId { get; set; }
        public ApplicationRole Role { get; set; }
        public ApplicationGroup Group { get; set; }
    }
}
