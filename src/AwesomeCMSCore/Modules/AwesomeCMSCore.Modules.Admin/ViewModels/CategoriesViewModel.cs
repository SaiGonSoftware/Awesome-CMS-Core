using System.ComponentModel.DataAnnotations;

namespace AwesomeCMSCore.Modules.Admin.ViewModels
{
	public class CategoriesViewModel
	{
		[Required]
		public string CategoriesData { get; set; }
		[Required]
		public string CategoriesOptions { get; set; }

		public string UserId { get; set; }
	}
}
