using System.ComponentModel.DataAnnotations;

namespace AwesomeCMSCore.Modules.Account.ViewModels
{
	public class ForgotPasswordViewModel
	{
		[Required]
		[EmailAddress]
		public string Email { get; set; }
	}
}
