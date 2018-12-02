using System.Threading.Tasks;

namespace AwesomeCMSCore.Modules.Shared.Repositories
{
	interface INewsLetterRepository
	{
		Task<bool> RegisterSubscriptionEmail(string email);
		Task SendEmailSubscriptionAsync();
	}
}
