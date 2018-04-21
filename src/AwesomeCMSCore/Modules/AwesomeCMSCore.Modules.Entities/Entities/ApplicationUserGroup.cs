using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AwesomeCMSCore.Modules.Entities.Entities
{
    public class ApplicationUserGroup
    {
        [Required]
        public string UserId { get; set; }
        [Required]
        public string GroupId { get; set; }
        public User User { get; set; }
        public ApplicationGroup Group { get; set; }
    }
}
