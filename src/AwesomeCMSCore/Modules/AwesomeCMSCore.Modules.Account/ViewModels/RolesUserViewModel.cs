using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AwesomeCMSCore.Modules.Account.ViewModels
{
	public class RolesUserViewModel
	{
		[Required]
		public string UserId { get; set; }
		public IEnumerable<string> RolesName { get; set; }
		[Required]
		public IList<string> CurrentUserRoles { get; set; }
	}
}
