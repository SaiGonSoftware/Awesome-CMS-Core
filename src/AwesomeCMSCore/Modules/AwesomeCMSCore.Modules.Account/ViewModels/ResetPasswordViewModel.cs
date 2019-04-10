using System.ComponentModel.DataAnnotations;

namespace AwesomeCMSCore.Modules.Account.ViewModels
{
	public class ResetPasswordViewModel
	{
		[Required]
		public string Email { get; set; }
		[Required]
		public string Token { get; set; }
		[Required]
		public string Password { get; set; }
	}
}
