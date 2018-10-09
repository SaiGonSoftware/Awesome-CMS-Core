using System;
using System.Collections.Generic;
using System.Text;
using AwesomeCMSCore.Modules.Entities.Enums;

namespace AwesomeCMSCore.Modules.Entities.Entities
{
    public class Comment: BaseEntity
    {
        public string Content { get; set; }
				public int ParentId { get; set; }
        public Post Post { get; set; }
        public User User { get; set; }
        public CommentStatus CommentStatus { get; set; }
    }
}
