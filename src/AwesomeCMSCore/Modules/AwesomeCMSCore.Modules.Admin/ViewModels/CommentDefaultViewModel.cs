using System;
using System.Collections.Generic;
using System.Text;
using AwesomeCMSCore.Modules.Entities.Entities;

namespace AwesomeCMSCore.Modules.Admin.ViewModels
{
    public class CommentDefaultViewModel
    {
        public IEnumerable<Comment> Comments { get; set; }
        public int NumberOfComments { get; set; }
        public IEnumerable<Comment> PendingComments { get; set; }
        public int NumberOfPendingComments { get; set; }
        public IEnumerable<Comment> ApprovedComments { get; set; }
        public int NumberOfApprovedComments { get; set; }
        public IEnumerable<Comment> SpamComments { get; set; }
        public int NumberOfSpamComments { get; set; }
        public IEnumerable<Comment> DeletedComments { get; set; }
        public int NumberOfDeletedComments { get; set; }
    }
}
