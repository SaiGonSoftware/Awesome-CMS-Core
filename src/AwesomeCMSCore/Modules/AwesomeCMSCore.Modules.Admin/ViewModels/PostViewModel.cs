using System;
using System.Collections.Generic;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Entities.Enums;
using Microsoft.AspNetCore.Http;

namespace AwesomeCMSCore.Modules.Admin.ViewModels
{
	public class PostViewModel
	{
		public int? Id { get; set; }
		public string Title { get; set; }
		public string ShortDescription { get; set; }
		public string Content { get; set; }
		public PostOptionsDefaultViewModel PostOptionsDefaultViewModel { get; set; }
		public DateTime DateCreated { get; set; } = DateTime.Now;
		public IFormFile Thumbnail { get; set; }
		public ICollection<Media> Media { get; set; }
		public PostStatus PostStatus { get; set; }
	}
}
