using AwesomeCMSCore.Modules.Account.Services;
using AwesomeCMSCore.Modules.Account.ViewModels;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Helper.Filter;
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
        private readonly IGroupService _groupService;
        public GroupController(IGroupService groupService)
        {
            _groupService = groupService;
        }

        public async Task<IActionResult> GroupList()
        {
            var groupLists = await _groupService.GroupListAsync();
            return Ok(groupLists);
        }

        public async Task<IActionResult> GetGroup(string id)
        {
            var groupItem = await _groupService.GetGroup(id);
            return Ok(groupItem);
        }

        [HttpPost, ValidModel]
        public async Task<IActionResult> CreateGroup([FromBody]GroupViewModel groupVm)
        {
            var result = await _groupService.CreateGroup(groupVm);
            if (result)
            {
                return Ok();
            }
            return BadRequest();
        }

    }
}
