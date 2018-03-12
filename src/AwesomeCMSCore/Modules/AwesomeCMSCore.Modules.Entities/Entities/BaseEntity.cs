using System;

namespace AwesomeCMSCore.Modules.Entities.Entities
{
    public class BaseEntity
    {
        public int Id { get; set; }
        public Guid UniqeId { get; set; }
        public DateTime DateCreate { get; set; }
        public DateTime DateModified { get; set; }
    }
}
