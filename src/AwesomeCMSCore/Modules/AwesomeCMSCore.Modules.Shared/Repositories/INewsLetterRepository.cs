using System.Threading.Tasks;

namespace AwesomeCMSCore.Modules.Shared.Repositories
{
	public interface INewsLetterRepository
	{
		Task<bool> RegisterSubscriptionEmail(string email);
		Task SendEmailSubscriptionAsync();
	}
}
