using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using AwesomeCMSCore.Modules.Admin.ViewModels;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Entities.Enums;
using AwesomeCMSCore.Modules.Repositories;
using Newtonsoft.Json;

namespace AwesomeCMSCore.Modules.Admin.Repositories
{
	public class SettingsRepository: ISettingsRepository
	{
		private readonly IUnitOfWork _unitOfWork;

		public SettingsRepository(IUnitOfWork unitOfWork)
		{
			_unitOfWork = unitOfWork;
		}

		public async Task<Settings> GetCronSetting()
		{
			return await FindCronSetting();
		}

		public async Task<bool> SaveCronSetting(string cronValue)
		{
			var cronSetting = await FindCronSetting();
			if (cronSetting == null)
			{
				using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
				{
					try
					{
						var data = new Settings
						{
							SettingKey = SettingKey.EmailSubscription,
							Value = cronValue
						};
						await _unitOfWork.Repository<Settings>().AddAsync(data);
						transaction.Complete();
					}
					catch (Exception)
					{
						_unitOfWork.Rollback();
						return false;
					}
				}
			}
			else
			{
				using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
				{
					try
					{
						cronSetting.Value = cronValue;
						await _unitOfWork.Repository<Settings>().UpdateAsync(cronSetting);
						transaction.Complete();
					}
					catch (Exception)
					{
						_unitOfWork.Rollback();
						return false;
					}
				}
			}

			return true;
		}

		public async Task<SocialProfileSettings> GetSocialProfileSettings()
		{
			var result = await FindSocialProfileSettings();
			var socialProfileSettings = JsonConvert.DeserializeObject<SocialProfileSettings>(result.Value);
			return socialProfileSettings;
		}

		public async Task<bool> SaveSocialProfileSettings(SocialProfileSettings settings)
		{
			var socialSettings = JsonConvert.SerializeObject(settings);
			var existingSettings = await FindSocialProfileSettings();
			if (existingSettings == null)
			{
				using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
				{
					try
					{
						var data = new Settings
						{
							SettingKey = SettingKey.Social,
							Value = socialSettings
						};
						await _unitOfWork.Repository<Settings>().AddAsync(data);
						transaction.Complete();
					}
					catch (Exception)
					{
						_unitOfWork.Rollback();
						return false;
					}
				}
			}
			else
			{
				using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
				{
					try
					{
						existingSettings.Value = socialSettings;
						await _unitOfWork.Repository<Settings>().UpdateAsync(existingSettings);
						transaction.Complete();
					}
					catch (Exception)
					{
						_unitOfWork.Rollback();
						return false;
					}
				}
			}

			return true;
		}


		public async Task<ProfileSetting> GetProfileSetting()
		{
			var result = await FindProfileSetting();
			var profileSettings = JsonConvert.DeserializeObject<ProfileSetting>(result.Value);
			return profileSettings;
		}

		public async Task<bool> SaveProfileSettings(ProfileSetting setting)
		{
			var profileSetting = JsonConvert.SerializeObject(setting);
			var existingProfileSetting = await FindProfileSetting();
			if (existingProfileSetting == null)
			{
				using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
				{
					try
					{
						var data = new Settings
						{
							SettingKey = SettingKey.Profile,
							Value = profileSetting
						};
						await _unitOfWork.Repository<Settings>().AddAsync(data);
						transaction.Complete();
					}
					catch (Exception)
					{
						_unitOfWork.Rollback();
						return false;
					}
				}
			}
			else
			{
				using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
				{
					try
					{
						existingProfileSetting.Value = profileSetting;
						await _unitOfWork.Repository<Settings>().UpdateAsync(existingProfileSetting);
						transaction.Complete();
					}
					catch (Exception)
					{
						_unitOfWork.Rollback();
						return false;
					}
				}
			}

			return true;
		}

		private async Task<Settings> FindSocialProfileSettings()
		{
			var result = await _unitOfWork.Repository<Settings>().FindAsync(s => s.SettingKey == SettingKey.Social);
			return result;
		}

		private async Task<Settings> FindCronSetting()
		{
			return await _unitOfWork.Repository<Settings>().FindAsync(s => s.SettingKey == SettingKey.EmailSubscription);
		}

		private async Task<Settings> FindProfileSetting()
		{
			var result = await _unitOfWork.Repository<Settings>().FindAsync(s => s.SettingKey == SettingKey.Profile);
			return result;
		}
	}
}
