using AwesomeCMSCore.Modules.Entities.ViewModel;

namespace AwesomeCMSCore.Modules.Admin.ViewModels
{
	public class CommentViewModel
	{
		public PostViewModel Post { get; set; }
		public CommentDto Comment { get; set; }
		public UserViewModel User { get; set; }
	}
}