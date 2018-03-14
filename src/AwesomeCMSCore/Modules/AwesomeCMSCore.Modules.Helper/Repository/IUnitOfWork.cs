using System;
using System.Collections.Generic;
using System.Text;

namespace AwesomeCMSCore.Modules.Helper.Repository
{
    public interface IUnitOfWork
    {
        IGenericRepository<T> Repository<T>() where T : class;

        void Commit();

        void Rollback();
    }
}
