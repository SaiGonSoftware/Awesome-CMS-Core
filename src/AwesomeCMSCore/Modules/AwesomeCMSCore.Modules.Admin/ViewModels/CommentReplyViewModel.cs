using System;
using System.Collections.Generic;
using System.Text;

namespace AwesomeCMSCore.Modules.Admin.ViewModels
{
  public class CommentReplyViewModel
  {
	public int ParentId { get; set; }
	public int PostId { get; set; }
	public string CommentBody { get; set; }
  }
}
