namespace AwesomeCMSCore.Module.Entities.Entities
{
    public class Tag: BaseEntity
    {
        public string TagName { get; set; }
        public TagGroup TagGroup { get; set; }
    }
}
