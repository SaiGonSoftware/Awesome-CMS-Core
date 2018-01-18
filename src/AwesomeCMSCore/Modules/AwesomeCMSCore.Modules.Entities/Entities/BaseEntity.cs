using System;

namespace AwesomeCMSCore.Modules.Entities.Entities
{
    public class BaseEntity
    {
        public Guid Id { get; set; }
        public DateTime DateCreate { get; set; }
        public DateTime DateModified { get; set; }
    }
}
