using System;
using System.Collections.Generic;
using System.Text;

namespace AwesomeCMSCore.Module.Entities.Entities
{
    public class Theme: BaseEntity
    {
        public string Name { get; set; }
        public string Thumbnail { get; set; }
        public string Path { get; set; }
    }
}
