using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Entities.Enums;
using AwesomeCMSCore.Modules.Repositories;

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

		private async Task<Settings> FindCronSetting()
		{
			return await _unitOfWork.Repository<Settings>().FindAsync(s => s.SettingKey == SettingKey.EmailSubscription);
		}
	}
}
