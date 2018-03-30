namespace AwesomeCMSCore.Modules.Entities.Entities
{
    public class TagOptions: BaseEntity
    {
        public User User { get; set; }
        public string Options { get; set; }
        public Post Post { get; set; }
    }
}
