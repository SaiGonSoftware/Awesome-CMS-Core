using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic; 
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AwesomeCMSCore.Modules.Entities.Entities
{ 
    public class ApplicationGroup
    {
        public ApplicationGroup() { } 
        public ApplicationGroup(string name) : this()
        {
            this.Roles = new List<ApplicationGroupRole>();
            this.Name = name;
        }

        [Key]
        [Required]
        public string Id { get; set; } 
        public string Name { get; set; }
        public ICollection<ApplicationGroupRole> Roles { get; set; }
        public ICollection<ApplicationUserGroup> Users { get; set; }
    } 
}
