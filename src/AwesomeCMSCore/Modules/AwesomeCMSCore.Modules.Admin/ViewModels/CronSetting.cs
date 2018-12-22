using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AwesomeCMSCore.Modules.Admin.ViewModels
{
	public class CronSetting
	{
		[Required]
		public string CronValue { get; set; }
	}
}
