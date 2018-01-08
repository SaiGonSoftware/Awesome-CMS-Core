using System;
using System.Collections.Generic;
using System.Text;

namespace AwesomeCMSCore.Module.Entities.Entities
{
    public class BaseEntity
    {
        public Guid Id { get; set; }
        public DateTime DateCreate { get; set; }
        public DateTime DateModified { get; set; }
    }
}
