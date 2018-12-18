using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Email;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Repositories;
using Hangfire;

namespace AwesomeCMSCore.Modules.Scheduled
{
	public class ScheduledEmailService: IScheduledEmailService
	{
		private readonly IEmailSender _emailSender;
		private readonly IUnitOfWork _unitOfWork;
		public ScheduledEmailService(IEmailSender emailSender)
		{
			_emailSender = emailSender;
		}

		public async Task SendEmailBackground()
		{
			try
			{
				var emailList = await _unitOfWork.Repository<NewsLetter>().GetAllAsync();
				if (emailList.Count > 0)
				{
					foreach (var email in emailList)
					{
						await _emailSender.SendEmailAsync(email.Email, "", null, EmailType.SubscriptionEmail);
					}
				}
			}
			catch (Exception ex)
			{
				throw;
			}
		}
	}
}
