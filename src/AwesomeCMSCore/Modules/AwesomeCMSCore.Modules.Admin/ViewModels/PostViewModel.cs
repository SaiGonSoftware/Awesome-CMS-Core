using System;
using System.Collections.Generic;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Entities.Enums;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json.Linq;

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
		public MediaViewModel MediaViewModel { get; set; }
		public PostStatus PostStatus { get; set; }
		/// <summary>
		/// These 2 only use to map with submit data using FormData since we submit JsonStringify
		/// </summary>
		public string PostOptionsViewModel { get; set; }
		public IFormFile Thumbnail { get; set; }
	}
}
