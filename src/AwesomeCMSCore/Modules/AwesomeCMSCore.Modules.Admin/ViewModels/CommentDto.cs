using System;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Entities.Enums;

namespace AwesomeCMSCore.Modules.Admin.ViewModels
{
	public class CommentDto
	{
		public int Id { get; set; }
		public Guid UniqeId { get; set; }
		public string Content { get; set; }
		public Comment ParentComment { get; set; }
		public CommentStatus CommentStatus { get; set; }
		public DateTime DateCreated { get; set; }
	}
}