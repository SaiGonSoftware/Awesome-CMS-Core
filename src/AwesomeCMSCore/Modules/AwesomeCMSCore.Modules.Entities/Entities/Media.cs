namespace AwesomeCMSCore.Module.Entities.Entities
{
    public class Media:BaseEntity
    {
        public string Name { get; set; }
        public string Path { get; set; }
        public User Owner { get; set; }
    }
}
