using AwesomeCMSCore.Modules.Account.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AwesomeCMSCore.Modules.Account.Repositories
{
    public interface IGroupRespository
    {
        Task<IEnumerable<GroupViewModel>> GroupList();
        Task Create(GroupViewModel groupViewModel);
    }
}
