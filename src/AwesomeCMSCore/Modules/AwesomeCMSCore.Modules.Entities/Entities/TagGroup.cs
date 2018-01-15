using System;
using System.Collections.Generic;
using System.Text;

namespace AwesomeCMSCore.Module.Entities.Entities
{
    public class TagGroup: BaseEntity
    {
        public string Name { get; set; }
        public IList<Tag> Tags { get; set; }
    }
}
