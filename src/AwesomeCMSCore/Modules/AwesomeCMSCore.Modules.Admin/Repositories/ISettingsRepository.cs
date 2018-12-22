using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Entities.Entities;

namespace AwesomeCMSCore.Modules.Admin.Repositories
{
	public interface ISettingsRepository
	{
		Task<Settings> GetCronSetting();
		Task<bool> SaveCronSetting(string cronValue);
	}
}
