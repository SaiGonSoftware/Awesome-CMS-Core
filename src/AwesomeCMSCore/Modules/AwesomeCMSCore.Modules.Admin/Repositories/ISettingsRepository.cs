using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Admin.ViewModels;
using AwesomeCMSCore.Modules.Entities.Entities;

namespace AwesomeCMSCore.Modules.Admin.Repositories
{
	public interface ISettingsRepository
	{
		Task<Settings> GetCronSetting();
		Task<bool> SaveCronSetting(string cronValue);
		Task<SocialProfileSettings> GetSocialProfileSettings();
		Task<bool> SaveSocialProfileSettings(SocialProfileSettings settings);
		Task<ProfileSetting> GetProfileSetting();
		Task<bool> SaveProfileSettings(ProfileSetting setting);
	}
}
