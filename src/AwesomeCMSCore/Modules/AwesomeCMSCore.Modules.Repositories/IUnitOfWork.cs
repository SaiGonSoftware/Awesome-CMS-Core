using System.Threading.Tasks;

namespace AwesomeCMSCore.Modules.Repositories
{
	public interface IUnitOfWork
	{
		IGenericRepository<T> Repository<T>() where T : class;

		Task<int> Commit();

		void Rollback();
	}
}
