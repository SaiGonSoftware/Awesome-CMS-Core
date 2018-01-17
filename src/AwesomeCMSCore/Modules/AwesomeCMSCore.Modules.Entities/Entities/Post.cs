namespace AwesomeCMSCore.Module.Entities.Entities
{
    public class Post:BaseEntity
    {
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string Content { get; set; }
        public Tag Tags { get; set; }
        public User User { get; set; }
        public bool IsDeleted { get; set; }
    }
}
