using System;
using System.Collections.Generic;
using System.Text;
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
        Task DeletePost(int postId);
    }
}
