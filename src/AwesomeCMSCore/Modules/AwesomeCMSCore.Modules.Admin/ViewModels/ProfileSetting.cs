using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace AwesomeCMSCore.Modules.Admin.ViewModels
{
	public class ProfileSetting
	{
		public string UserName { get; set; }
		public string ShortIntro { get; set; }
		public string JobTitle { get; set; }
		public string StorePath { get; set; }
		public IFormFile Avatar { get; set; }
	}
}
