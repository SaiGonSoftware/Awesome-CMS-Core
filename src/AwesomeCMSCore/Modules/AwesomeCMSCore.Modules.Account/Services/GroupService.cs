using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Account.Repositories;
using AwesomeCMSCore.Modules.Account.ViewModels;

namespace AwesomeCMSCore.Modules.Account.Services
{
    public class GroupService : IGroupService
    {
        private readonly IGroupRespository _groupRespository;
        public GroupService(IGroupRespository groupRespoitory)
        {
            _groupRespository = groupRespoitory;
        }
        public async Task<IEnumerable<GroupViewModel>> GroupListAsync()
        {
            return await _groupRespository.GroupList();
        }
    }
}
