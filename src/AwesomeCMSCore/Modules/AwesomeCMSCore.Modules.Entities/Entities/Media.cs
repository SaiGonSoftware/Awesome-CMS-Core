namespace AwesomeCMSCore.Modules.Entities.Entities
{
    public class Media:BaseEntity
    {
        public string Name { get; set; }
        public string Path { get; set; }
        public bool IsDeleted { get; set; }
        public Post Post { get; set; }
        public User User { get; set; }
    }
}
