using System;

namespace AwesomeCMSCore.Modules.Entities.Entities
{
    public class BaseEntity
    {
        public int Id { get; set; }
        public Guid UniqeId { get; set; } = Guid.NewGuid();
        public DateTime DateCreate { get; set; } = DateTime.Now;
        public DateTime DateModified { get; set; }
    }
}
