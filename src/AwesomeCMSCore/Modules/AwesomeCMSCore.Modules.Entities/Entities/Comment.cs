using System;
using System.Collections.Generic;
using System.Text;
using AwesomeCMSCore.Modules.Entities.Enums;

namespace AwesomeCMSCore.Modules.Entities.Entities
{
    public class Comment: BaseEntity
    {
        public int PostId { get; set; }
        public string Content { get; set; }
        public Post Post { get; set; }
        public User User { get; set; }
        public CommentStatus CommentStatus { get; set; }
    }
}
