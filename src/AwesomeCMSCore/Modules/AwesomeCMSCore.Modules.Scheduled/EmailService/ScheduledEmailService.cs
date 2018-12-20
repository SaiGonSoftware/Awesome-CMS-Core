using System;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Email;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Repositories;
using AwesomeCMSCore.Modules.Scheduled.BaseScheduled;
using Microsoft.Extensions.DependencyInjection;

namespace AwesomeCMSCore.Modules.Scheduled.EmailService
{
	public class ScheduledEmailService: ScheduledProcessor
	{
		private readonly IEmailSender _emailSender;
		private readonly IUnitOfWork _unitOfWork;

		private string _cronValue;
		protected override string Schedule => "*/1 * * * *";
		public ScheduledEmailService(
		    IServiceScopeFactory serviceScopeFactory,
			IEmailSender emailSender, 
			IUnitOfWork unitOfWork) : base(serviceScopeFactory)
		{
			_emailSender = emailSender;
			_unitOfWork = unitOfWork;
		}

		protected override string GetCronExpression()
		{
			_cronValue = "*/1 * * * *";
			return _cronValue;
		}

		public override Task ProcessInScope(IServiceProvider serviceProvider)
		{
			var emailList = _unitOfWork.Repository<NewsLetter>().GetAll();
			if (emailList.Count <= 0) return Task.CompletedTask;

			foreach (var email in emailList)
			{
				_emailSender.SendEmailAsync(email.Email, "", null, EmailType.SubscriptionEmail);
			}

			return Task.CompletedTask;
		}
	}
}
