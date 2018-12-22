using System;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Email;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Entities.Enums;
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
                return unitOfWork.Repository<Settings>().Find(s => s.SettingKey == SettingKey.EmailSubscription).Value;
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

    //public class ScheduledEmailService : BackgroundService
    //{
    //	private readonly IServiceScopeFactory _serviceScopeFactory;
    //	private readonly IEmailSender _emailSender;
    //	private readonly IUnitOfWork _unitOfWork;

    //	public ScheduledEmailService(IServiceScopeFactory serviceScopeFactory)
    //	{
    //		_serviceScopeFactory = serviceScopeFactory;
    //		var serviceProvider = serviceScopeFactory.CreateScope().ServiceProvider;
    //		_unitOfWork = serviceProvider.GetRequiredService<IUnitOfWork>();
    //		_emailSender = serviceProvider.GetRequiredService<IEmailSender>();
    //	}

    //	protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    //	{
    //		do
    //		{
    //			var a = await _unitOfWork.Repository<User>().GetAllAsync();
    //			await Task.Delay(10 * 1000, stoppingToken);
    //		} while (!stoppingToken.IsCancellationRequested);
    //	}
    //}
}
