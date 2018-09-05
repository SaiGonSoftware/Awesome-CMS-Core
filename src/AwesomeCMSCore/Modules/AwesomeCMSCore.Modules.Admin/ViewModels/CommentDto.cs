using System;
using AwesomeCMSCore.Modules.Entities.Enums;

namespace AwesomeCMSCore.Modules.Admin.ViewModels
{
    public class CommentDto
    {
        public int Id { get; set; }
        public Guid UniqueId { get; set; }
        public string Content { get; set; }
        public CommentStatus CommentStatus { get; set; }
        public DateTime DateCreated { get; set; }
    }
}