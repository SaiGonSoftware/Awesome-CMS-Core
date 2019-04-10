using System.Collections.Generic;

namespace AwesomeCMSCore.Modules.Admin.ViewModels
{
	public class CommentDefaultViewModel
	{
		public IEnumerable<CommentViewModel> AllComments { get; set; }
		public int NumberOfComments { get; set; }
		public IEnumerable<CommentViewModel> PendingComments { get; set; }
		public int NumberOfPendingComments { get; set; }
		public IEnumerable<CommentViewModel> ApprovedComments { get; set; }
		public int NumberOfApprovedComments { get; set; }
		public IEnumerable<CommentViewModel> SpamComments { get; set; }
		public int NumberOfSpamComments { get; set; }
		public IEnumerable<CommentViewModel> DeletedComments { get; set; }
		public int NumberOfDeletedComments { get; set; }
	}
}
