namespace AwesomeCMSCore.Modules.Entities.Entities
{
    public class Tag: BaseEntity
    {
        public string TagData { get; set; }
        public string TagOptions { get; set; }
        //public TagGroup TagGroup { get; set; }
        public string UserId { get; set; }
    }
}
