using System;
using System.Linq;
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

        public Task SendEmailAsync(string reciever, string message, EmailOptions options, EmailType emailType)
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
                case EmailType.AccountConfirm:
                    email.Subject = "Account confirm";
                    builder.HtmlBody = AccountCreationConfirm(options);
                    email.Body = builder.ToMessageBody();
                    break;
                default:
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

        private static string AccountCreationConfirm(EmailOptions options)
        {
            var emailInfo = new string[] {
                $"UserName: {options.UserName}",
                $"Password: {options.Password}"
            };

            var emailInfoFormat = emailInfo.Select(item => MailBody.CreateBlock().Text(item));

            var body = MailBody
                .CreateBody()
                .Paragraph($"Hi {options.UserName} Please confirm your email address by clicking the link below.")
                .Paragraph("Here is your login information")
                .UnorderedList(emailInfoFormat)
                .Paragraph("Please change it after you login")
                .Button($"{options.Url}", "Confirm Email Address")
                .Paragraph("— [Awesome CMS Core]")
                .ToString();

            return body;
        }
        #endregion
    }
}
