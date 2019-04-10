using System;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Email;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Entities.Enums;
using AwesomeCMSCore.Modules.Helper.Enum;
using AwesomeCMSCore.Modules.Repositories;
using AwesomeCMSCore.Modules.Scheduled.BaseScheduled;
using Microsoft.Extensions.DependencyInjection;

namespace AwesomeCMSCore.Modules.Scheduled.EmailService
{
	public class ScheduledEmailService : ScheduledProcessor
	{
		public ScheduledEmailService(
			IServiceScopeFactory serviceScopeFactory) : base(serviceScopeFactory)
		{
		}

		/// <summary>
		/// Get cron setting from db
		/// </summary>
		/// <returns></returns>
		protected override string GetCronExpression(IServiceScopeFactory serviceScopeFactory)
		{
			using (var scope = serviceScopeFactory.CreateScope())
			{
				var unitOfWork = scope.ServiceProvider.GetService<IUnitOfWork>();
				var cronValue = unitOfWork.Repository<Settings>()
					.Find(s => s.SettingKey == SettingKey.EmailSubscription)?.Value;

				return cronValue ?? CronExpression.EveryWeek;
			}
		}

		public override Task ProcessInScope(IServiceProvider serviceProvider)
		{
			var unitOfWork = serviceProvider.GetService<IUnitOfWork>();
			var emailList = unitOfWork.Repository<NewsLetter>().GetAll();
			if (emailList.Count <= 0) return Task.CompletedTask;

			var emailSender = serviceProvider.GetService<IEmailSender>();
			foreach (var email in emailList)
			{
				emailSender.SendEmailAsync(email.Email, "", null, EmailType.SubscriptionEmail);
			}

			return Task.CompletedTask;
		}
	}
}
