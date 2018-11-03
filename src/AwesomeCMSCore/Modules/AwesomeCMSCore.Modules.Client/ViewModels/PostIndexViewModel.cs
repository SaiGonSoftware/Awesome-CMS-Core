using System;
using AwesomeCMSCore.Modules.Entities.Enums;

namespace AwesomeCMSCore.Modules.Client.ViewModels
{
	public class PostIndexViewModel
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string ShortDescription { get; set; }
		public string Content { get; set; }
		public PostStatus PostStatus { get; set; }
		public int Views { get; set; }
		public DateTime DateCreated { get; set; }
	}
}
