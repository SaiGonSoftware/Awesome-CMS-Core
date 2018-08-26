using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Admin.ViewModels;

namespace AwesomeCMSCore.Modules.Admin.Repositories
{
    public interface ICommentRepository
    {
        Task<CommentDefaultViewModel> GetAllComments();
    }
}
