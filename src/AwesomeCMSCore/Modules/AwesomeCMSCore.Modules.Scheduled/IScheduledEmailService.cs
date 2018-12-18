using System.Threading.Tasks;

namespace AwesomeCMSCore.Modules.Scheduled
{
	public interface IScheduledEmailService
	{
		Task SendEmailBackground();
	}
}