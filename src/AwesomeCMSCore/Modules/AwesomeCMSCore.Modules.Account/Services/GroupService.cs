using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Account.ViewModels;

namespace AwesomeCMSCore.Modules.Account.Services
{
    public class GroupService : IGroupService
    {
        private readonly IGroupService _groupService;
        public GroupService(IGroupService groupService)
        {
            _groupService = groupService;
        }
        public async Task<IEnumerable<GroupViewModel>> GroupListAsync()
        {
            return await _groupService.GroupListAsync();
        }
    }
}
