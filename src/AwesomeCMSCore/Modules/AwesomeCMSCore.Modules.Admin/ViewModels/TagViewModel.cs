using System.ComponentModel.DataAnnotations;

namespace AwesomeCMSCore.Modules.Admin.ViewModels
{
	public class TagViewModel
	{
		[Required]
		public string TagData { get; set; }
		[Required]
		public string TagOptions { get; set; }

		public string UserId { get; set; }
	}
}
