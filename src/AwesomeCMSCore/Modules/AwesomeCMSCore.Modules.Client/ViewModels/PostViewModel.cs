using System.Collections.Generic;
using AwesomeCMSCore.Modules.Admin.ViewModels;

namespace AwesomeCMSCore.Modules.Client.ViewModels
{
	public class IndexViewModel
	{
		public IEnumerable<PostListViewModel> Posts { get; set; }
		public PostIndexViewModel RecentPost { get; set; }
		public IEnumerable<PostListViewModel> PopularPosts { get; set; }
		public SocialProfileSettings SocialProfileSettings { get; set; }
		public ProfileSetting ProfileSetting { get; set; }
		/// <summary>
		/// TODO update to model
		/// </summary>
		public object Categories { get; set; }
	}
}
