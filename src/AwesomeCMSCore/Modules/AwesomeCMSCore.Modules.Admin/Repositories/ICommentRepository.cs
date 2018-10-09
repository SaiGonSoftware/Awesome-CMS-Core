using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Admin.ViewModels;
using AwesomeCMSCore.Modules.Entities.Enums;

namespace AwesomeCMSCore.Modules.Admin.Repositories
{
  public interface ICommentRepository
  {
	Task<CommentDefaultViewModel> GetAllComments();
	Task<bool> UpdateCommentStatus(int commentId, CommentStatus commentStatus);
	Task<bool> ReplyComment(CommentReplyViewModel replyViewModel);
  }
}
