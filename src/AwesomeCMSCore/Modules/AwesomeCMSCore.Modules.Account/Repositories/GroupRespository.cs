using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AwesomeCMSCore.Modules.Account.ViewModels;
using AwesomeCMSCore.Modules.Entities.Data;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Repositories;
using Microsoft.EntityFrameworkCore;

namespace AwesomeCMSCore.Modules.Account.Repositories
{
    public class GroupRespository : IGroupRespository
    {
        private readonly ApplicationDbContext _context;
        public GroupRespository(ApplicationDbContext _dbContext)
        {
            _context = _dbContext;
        }
        public Task Create(GroupViewModel groupViewModel)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<GroupViewModel>> GroupList()
        {
            var groupList = await (from applicationgroup in _context.ApplicationGroups
                                   select new GroupViewModel
                                   {
                                      Id = applicationgroup.Id,
                                      Name = applicationgroup.Name
                                   }).ToListAsync();
             return groupList;
        }
    }
}
