using System;
using System.Collections.Generic;
using System.Text;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Entities.Enums;

namespace AwesomeCMSCore.Modules.Admin.ViewModels
{
    public class PostViewModel
    {
        public int? Id { get; set; }
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string Content { get; set; }
        public bool IsDeleted { get; set; }
        public string TagData { get; set; }
        public string TagOptions { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public ICollection<Media> Media { get; set; }
        public PostStatus PostStatus { get; set; }
    }
}
