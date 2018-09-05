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
        public Post Post { get; set; }
        public CommentDto Comment { get; set;}
        public UserViewModel User { get; set; }
    }

    public class CommentDto
    {
        public int Id { get; set; }
        public Guid UniqueId { get; set; }
        public string Content { get; set; }
        public CommentStatus CommentStatus { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
