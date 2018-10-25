using System;
using System.Collections.Generic;
using System.Text;
using AwesomeCMSCore.Modules.Entities.Entities;

namespace AwesomeCMSCore.Modules.Admin.ViewModels
{
	public class CommentReplyViewModel
	{
		public Comment Comment { get; set; }
		public string CommentBody { get; set; }
	}
}
