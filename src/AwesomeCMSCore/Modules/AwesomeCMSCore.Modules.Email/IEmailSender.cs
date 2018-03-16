using System.Threading.Tasks;

namespace AwesomeCMSCore.Modules.Email
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string reciever, string message, EmailType emailType);
        Task SendEmailAsync(string email, string subject, string message);
        Task SendEmailConfirmationAsync(string email, string callbackUrl);
    }
}
