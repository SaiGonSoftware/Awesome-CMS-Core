using System.Collections.Generic;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Admin.ViewModels;

namespace AwesomeCMSCore.Modules.Admin.Repositories
{
	public interface IPostRepository
	{
		Task<PostDefaultViewModel> GetPostsDefaultViewModel();
		Task<IEnumerable<PostListViewModel>> GetAllPosts();
		Task<PostViewModel> GetPost(int postId);
		Task EditPost(PostViewModel postViewModel);
		Task SavePost(PostViewModel postViewModel);
		Task RestorePost(int postId);
		Task DeletePost(int postId);
	}
}
