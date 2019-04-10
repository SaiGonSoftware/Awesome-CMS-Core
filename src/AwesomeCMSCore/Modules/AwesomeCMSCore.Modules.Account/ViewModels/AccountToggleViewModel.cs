using System.ComponentModel.DataAnnotations;

namespace AwesomeCMSCore.Modules.Account.ViewModels
{
	public class AccountToggleViewModel
	{
		[Required]
		public string AccountId { get; set; }
		[Required]
		public bool ToogleFlag { get; set; }
	}
}
