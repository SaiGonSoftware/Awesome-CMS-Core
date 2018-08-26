using System.Collections.Generic;
using AwesomeCMSCore.Modules.Entities.Enums;

namespace AwesomeCMSCore.Modules.Entities.Entities
{
    public class Post: BaseEntity
    {
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string Content { get; set; }
        public PostStatus PostStatus { get; set; }
        public Tag Tags { get; set; }
        public User User { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<Media> Medias { get; set; }
    }
}
