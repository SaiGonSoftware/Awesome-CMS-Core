using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace AwesomeCMSCore.Modules.Entities.Entities
{
	public class User : IdentityUser
	{
		public virtual ICollection<IdentityUserRole<string>> Roles { get; set; }

		public virtual ICollection<IdentityUserClaim<string>> Claims { get; set; }
	}
}
