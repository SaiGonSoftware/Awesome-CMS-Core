using System;
using System.Collections.Generic;
using System.Text;
using AwesomeCMSCore.Modules.Entities.Entities;

namespace AwesomeCMSCore.Modules.Admin.ViewModels
{
	public class CommentReplyViewModel
	{
		public Comment ParentComment { get; set; }
		public int Id { get; set; }
		public int PostId { get; set; }
		public string CommentBody { get; set; }
	}
}
