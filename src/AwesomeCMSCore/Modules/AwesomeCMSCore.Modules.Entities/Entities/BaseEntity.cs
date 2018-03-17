using System;
using System.ComponentModel.DataAnnotations;

namespace AwesomeCMSCore.Modules.Entities.Entities
{
    public class BaseEntity
    {
        public int Id { get; set; }
        public Guid UniqeId { get; set; }
        public DateTime DateCreate = DateTime.Now;
        public DateTime DateModified = DateTime.Now;
    }
}
