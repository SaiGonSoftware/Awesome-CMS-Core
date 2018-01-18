using System.Collections.Generic;

namespace AwesomeCMSCore.Modules.Entities.Entities
{
    public class TagGroup: BaseEntity
    {
        public string Name { get; set; }
        public IList<Tag> Tags { get; set; }
    }
}
