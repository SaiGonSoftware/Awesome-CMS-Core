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
        private readonly IGroupRespository _groupRepository;
        public GroupService(IGroupRespository groupRepository)
        {
            _groupRepository = groupRepository;
        }

        public async Task<GroupViewModel> GetGroup(string id)
        {
            return await _groupRepository.GetGroup(id);
        }

        public async Task<IEnumerable<GroupViewModel>> GroupListAsync()
        {
            return await _groupRepository.GroupList();
        }
        public async Task<bool> CreateGroup(GroupViewModel groupViewModel)
        {
            return await _groupRepository.CreateGroup(groupViewModel);
        }
    }
}
