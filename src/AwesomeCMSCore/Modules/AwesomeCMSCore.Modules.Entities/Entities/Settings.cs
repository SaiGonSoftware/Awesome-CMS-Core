using System;
using System.Collections.Generic;
using System.Text;
using AwesomeCMSCore.Modules.Entities.Enums;

namespace AwesomeCMSCore.Modules.Entities.Entities
{
	public class Settings : BaseEntity
	{
		public string Value { get; set; }
		public SettingKey SettingKey { get; set; }
	}
}
