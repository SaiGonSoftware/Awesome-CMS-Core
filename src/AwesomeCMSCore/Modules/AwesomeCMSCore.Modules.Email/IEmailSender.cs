using System.Threading.Tasks;

namespace AwesomeCMSCore.Modules.Email
{
	public interface IEmailSender
	{
		Task SendEmailAsync(string reciever, string message, EmailOptions options, EmailType emailType);
	}
}
