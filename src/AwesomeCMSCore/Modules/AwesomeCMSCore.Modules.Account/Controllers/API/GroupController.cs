using AwesomeCMSCore.Modules.Account.Services;
using AwesomeCMSCore.Modules.Entities.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AwesomeCMSCore.Modules.Account.Controllers.API
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]/[action]")]
    public class GroupController : Controller
    {
        private readonly IGroupService groupService;
        public GroupController(IGroupService group)
        {
            groupService = group;
        }

        public async Task<IActionResult> GroupList()
        {
            var groupLists = await groupService.GroupListAsync();
            return Ok(groupLists);
        }
    }
}
