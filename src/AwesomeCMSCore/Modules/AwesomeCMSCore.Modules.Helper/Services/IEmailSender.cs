using System.Threading.Tasks;

namespace AwesomeCMSCore.Modules.Helper.Services
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
        Task SendEmailConfirmationAsync(string email, string callbackUrl);
    }
}
