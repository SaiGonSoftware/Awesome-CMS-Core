using System.Collections.Generic;

namespace AwesomeCMSCore.Modules.Admin.ViewModels
{
	public class PostDefaultViewModel
	{
		public IEnumerable<PostListViewModel> PostsPublished { get; set; }
		public IEnumerable<PostListViewModel> PostsDrafted { get; set; }
		public IEnumerable<PostListViewModel> PostsDeleted { get; set; }
		public int NumberOfPostPublished { get; set; }
		public int NumberOfDraftedPost { get; set; }
		public int NumberOfDeletedPost { get; set; }
	}
}