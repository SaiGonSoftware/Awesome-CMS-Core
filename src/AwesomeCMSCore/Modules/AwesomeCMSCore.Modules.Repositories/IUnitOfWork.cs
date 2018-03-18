namespace AwesomeCMSCore.Modules.Repositories
{
    public interface IUnitOfWork
    {
        IGenericRepository<T> Repository<T>() where T : class;

        void Commit();

        void Rollback();
    }
}
