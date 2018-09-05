using System;
using System.Collections.Generic;
using System.Text;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Entities.Enums;
using AwesomeCMSCore.Modules.Entities.ViewModel;

namespace AwesomeCMSCore.Modules.Admin.ViewModels
{
    public class CommentViewModel
    {
        public int Id { get; set; }
        public Guid UniqeId { get; set; }
        public string Content { get; set; }
        public Post Post { get; set; }
        public UserViewModel User { get; set; }
        public CommentStatus CommentStatus { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
