using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Admin.Models;

namespace AwesomeCMSCore.Modules.Admin.Repositories
{
    public interface IPostRepository
    {
        Task<IEnumerable<PostListViewModel>> GetAllPost();
        Task EditPost(PostViewModel postViewModel);
        Task SavePost(PostViewModel postViewModel);
    }
}
