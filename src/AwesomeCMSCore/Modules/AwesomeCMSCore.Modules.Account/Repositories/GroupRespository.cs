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
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AwesomeCMSCore.Modules.Account.Repositories
{
    public class GroupRespository : IGroupRespository
    { 
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        public GroupRespository(IUnitOfWork unitOfWork,IMapper mapper,UserManager<User> userManager)
        { 
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;
        } 

        public async Task<GroupViewModel> GetGroup(string id)
        {
            var groupItem =await _unitOfWork.Repository<ApplicationGroup>().FindBy(s=>s.Id == id).SingleOrDefaultAsync();
            var groupItemvm = _mapper.Map<ApplicationGroup, GroupViewModel>(groupItem);
            return groupItemvm;
        }

        public async Task<IEnumerable<GroupViewModel>> GroupList()
        {
            var groupList = await _unitOfWork.Repository<ApplicationGroup>().GetAllAsync();
            var groupListvm = (from groupItem in groupList
                               select new GroupViewModel
                               {
                                   Id = groupItem.Id,
                                   Name = groupItem.Name
                               }).ToList();
            return groupListvm;
        }

        public async Task<bool> CreateGroup(GroupViewModel groupVm)
        {
            ApplicationGroup applicationGroup = new ApplicationGroup();
            applicationGroup.Id = Guid.NewGuid().ToString();
            applicationGroup.Name = groupVm.Name;
            var result = await _unitOfWork.Repository<ApplicationGroup>().AddAsync(applicationGroup);
            foreach(var role in groupVm.Roles)
            {
                var roleItem = _unitOfWork.Repository<ApplicationRole>().Query().Where(s => s.Name == role).FirstOrDefault();
                ApplicationGroupRole applicationGroupRole = new ApplicationGroupRole();
                applicationGroupRole.RoleId = roleItem.Id;
                applicationGroupRole.GroupId = applicationGroup.Id;
                var result1 = await _unitOfWork.Repository<ApplicationGroupRole>().AddAsync(applicationGroupRole);
            }
            var userGroups = await _unitOfWork.Repository<ApplicationUserGroup>().GetAllAsync();
            foreach(var userGroup in userGroups)
            {
                var user = await _unitOfWork.Repository<User>().GetByIdAsync(userGroup.UserId);
                await _userManager.AddToRolesAsync(user, groupVm.Roles); 
            }
            return true;
        }
    }
}
