using System;
using System.Collections.Generic;
using System.Text;
using AwesomeCMSCore.Modules.Entities.Entities;

namespace AwesomeCMSCore.Modules.Admin.Models
{
    public class PostViewModel
    {
        public Guid? Id { get; set; }
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string Content { get; set; }
        public bool IsDeleted { get; set; }
        public string TagOptions { get; set; }
        public ICollection<Media> Media { get; set; }
    }
}
