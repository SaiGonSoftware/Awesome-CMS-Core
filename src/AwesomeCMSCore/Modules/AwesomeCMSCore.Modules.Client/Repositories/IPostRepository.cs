using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Client.ViewModels;

namespace AwesomeCMSCore.Modules.Client.Repositories
{
	public interface IPostRepository
	{
		Task<IndexViewModel> GetIndexViewModel();
	}
}
