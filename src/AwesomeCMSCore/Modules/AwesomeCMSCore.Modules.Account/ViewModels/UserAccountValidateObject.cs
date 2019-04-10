using System.ComponentModel.DataAnnotations;

namespace AwesomeCMSCore.Modules.Account.ViewModels
{
	public class UserAccountValidateObject
	{
		[Required]
		public string Key { get; set; }
		[Required]
		public string Value { get; set; }
	}
}
