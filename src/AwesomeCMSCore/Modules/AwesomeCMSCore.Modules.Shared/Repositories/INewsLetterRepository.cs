using System.Threading.Tasks;

namespace AwesomeCMSCore.Modules.Shared.Repositories
{
	public interface INewsLetterRepository
	{
		bool IsEmailRegistered(string email);
		Task<bool> RegisterSubscriptionEmail(string email);
		Task SendEmailSubscriptionAsync();
	}
}
