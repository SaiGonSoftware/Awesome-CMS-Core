using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AwesomeCMSCore.Modules.Account.ViewModels
{
	public class UserInputViewModel
	{
		[Required]
		public string Username { get; set; }
		[Required]
		public string Email { get; set; }
		[Required]
		public List<string> Roles { get; set; }
	}
}
