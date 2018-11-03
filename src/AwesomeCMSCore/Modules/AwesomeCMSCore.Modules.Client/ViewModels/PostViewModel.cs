using System.Collections.Generic;
using AwesomeCMSCore.Modules.Admin.ViewModels;

namespace AwesomeCMSCore.Modules.Client.ViewModels
{
	public class IndexViewModel
	{
		public IEnumerable<PostListViewModel> Posts { get; set; }
		public PostIndexViewModel RecentPosts { get; set; }
		public IEnumerable<PostListViewModel> PopularPosts { get; set; }
	}
}
