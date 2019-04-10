using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using AwesomeCMSCore.Modules.Admin.ViewModels;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Entities.Enums;
using AwesomeCMSCore.Modules.GoogleDriveAPI;
using AwesomeCMSCore.Modules.Helper.Enum;
using AwesomeCMSCore.Modules.Helper.Extensions;
using AwesomeCMSCore.Modules.Repositories;
using AwesomeCMSCore.Modules.Shared.Settings;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace AwesomeCMSCore.Modules.Admin.Repositories
{
	public class SettingsRepository : ISettingsRepository
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IOptions<AssetSettings> _assetSettings;

		public SettingsRepository(
			IUnitOfWork unitOfWork,
			IOptions<AssetSettings> assetSettings)
		{
			_unitOfWork = unitOfWork;
			_assetSettings = assetSettings;
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
			var socialProfileSettings = result != null ? JsonConvert.DeserializeObject<SocialProfileSettings>(result.Value) : null;
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
			var profileSettings = result != null ? JsonConvert.DeserializeObject<ProfileSetting>(result.Value) : null;
			return profileSettings;
		}

		public async Task<bool> SaveProfileSettings(ProfileSetting setting)
		{
			var existingProfileSetting = await FindProfileSetting();

			if (existingProfileSetting == null)
			{
				using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
				{
					try
					{
						var profileSetting = await ProcessProfileSettingsModel(setting);

						var data = new Settings
						{
							SettingKey = SettingKey.Profile,
							Value = JsonConvert.SerializeObject(profileSetting)
						};

						await _unitOfWork.Repository<Settings>().AddAsync(data);
						transaction.Complete();
					}
					catch (Exception ex)
					{
						_unitOfWork.Rollback();
						throw ex;
					}
				}
			}
			else
			{
				using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
				{
					try
					{
						var profileSetting = await ProcessProfileSettingsModel(setting);

						existingProfileSetting.Value = JsonConvert.SerializeObject(profileSetting);

						await _unitOfWork.Repository<Settings>().UpdateAsync(existingProfileSetting);
						transaction.Complete();
					}
					catch (Exception ex)
					{
						_unitOfWork.Rollback();
						throw ex;
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

		private async Task<ProfileSetting> ProcessProfileSettingsModel(ProfileSetting setting)
		{
			var profileSetting = new ProfileSetting
			{
				JobTitle = setting.JobTitle,
				ShortIntro = setting.ShortIntro,
				UserName = setting.UserName,
				StorePath = null
			};

			if (setting.Avatar != null)
			{
				var fileName = $"{RandomString.GenerateRandomString(AppEnum.MinGeneratedAssetName)}.{setting.Avatar.ContentType.Split("/")[1]}";
				var storePath = Path.Combine(_assetSettings.Value.StorePath, fileName);
				using (var stream = new FileStream(storePath, FileMode.Create))
				{
					await setting.Avatar.CopyToAsync(stream);
				}

				profileSetting.StorePath = $"./assets/{fileName}";
			}

			return profileSetting;
		}
	}
}
