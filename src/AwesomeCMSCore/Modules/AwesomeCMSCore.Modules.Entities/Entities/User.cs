using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace AwesomeCMSCore.Modules.Entities.Entities
{
    public class User : IdentityUser
    {
        public User()
           : base()
        {
            this.Groups = new HashSet<ApplicationUserGroup>();
        }
         public virtual ICollection<ApplicationUserGroup> Groups { get; set; }
     }
}
