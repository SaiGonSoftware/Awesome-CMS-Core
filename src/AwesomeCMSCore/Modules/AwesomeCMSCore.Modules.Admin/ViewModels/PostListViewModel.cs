using System;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Entities.Enums;

namespace AwesomeCMSCore.Modules.Admin.ViewModels
{
	public class PostListViewModel
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string ShortDescription { get; set; }
		public string Content { get; set; }
		public string Tags { get; set; }
		public string Categories { get; set; }
		public PostStatus PostStatus { get; set; }
		public int Views { get; set; }
		public DateTime DateCreated { get; set; }
		public Media Medias { get; set; }
	}
}