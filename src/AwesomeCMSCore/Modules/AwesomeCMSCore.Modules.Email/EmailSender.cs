using System;
using System.Threading.Tasks;
using MailBodyPack;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;

namespace AwesomeCMSCore.Modules.Email
{
    public class EmailSender : IEmailSender
    {
        private readonly IOptions<EmailSettings> _emailSetting;

        public EmailSender(IOptions<EmailSettings> emailSetting)
        {
            _emailSetting = emailSetting;
        }

        public Task SendEmailAsync(string reciever, string message, EmailType emailType)
        {
            var email = new MimeMessage();
            var builder = new BodyBuilder();

            email.From.Add(new MailboxAddress(_emailSetting.Value.SenderName, _emailSetting.Value.Sender));
            email.To.Add(new MailboxAddress(reciever, reciever));

            switch (emailType)
            {
                case EmailType.SystemLog:
                    email.Subject = "System log";
                    builder.HtmlBody = ExceptionEmailRender(message);
                    email.Body = builder.ToMessageBody();
                    break;
            }

            using (var client = new SmtpClient())
            {
                client.Connect(_emailSetting.Value.MailServer, _emailSetting.Value.MailPort, false);

                client.Authenticate(_emailSetting.Value.Email, _emailSetting.Value.Password);

                client.Send(email);
                client.Disconnect(true);
            }

            return Task.CompletedTask;
        }

        public Task SendEmailAsync(string email, string subject, string message)
        {
            throw new NotImplementedException();
        }

        public Task SendEmailConfirmationAsync(string email, string callbackUrl)
        {
            throw new NotImplementedException();
        }

        #region Email render

        private static string ExceptionEmailRender(string stackTrace)
        {
            var body = MailBody
                .CreateBody()
                .Title("Awesome CMS Exception log")
                .Paragraph("Hello,")
                .Paragraph($"The following exception was throw at {DateTime.Now}")
                .Paragraph(stackTrace)
                .Paragraph("— [Awesome CMS Core system log] --")
                .ToString();

            return body;
        }

        #endregion
    }
}
