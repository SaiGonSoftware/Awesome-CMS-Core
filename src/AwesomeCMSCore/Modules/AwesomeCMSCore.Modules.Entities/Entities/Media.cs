using System;
using System.Collections.Generic;
using System.Text;

namespace AwesomeCMSCore.Module.Entities.Entities
{
    public class Media:BaseEntity
    {
        public string Name { get; set; }
        public string Path { get; set; }
        public User Owner { get; set; }
    }
}
