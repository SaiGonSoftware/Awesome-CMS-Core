using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Admin.Services;
using AwesomeCMSCore.Modules.Admin.ViewModels;
using AwesomeCMSCore.Modules.Helper.Filter;
using AwesomeCMSCore.Modules.Helper.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AwesomeCMSCore.Modules.Admin.Controllers.API.V1
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiVersion("1.0")]
    [ApiExplorerSettings(GroupName = "v1")]
    [Route("api/v{version:apiVersion}/tag/[action]")]
    public class TagController : Controller
    {
        private readonly ITagService _tagService;
        private readonly IUserService _userService;

        public TagController(
            ITagService tagService,
            IUserService userService)
        {
            _tagService = tagService;
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetTag()
        {
            return Ok(await _tagService.GetAllTag());
        }

        [HttpPost, ValidModel]
        public async Task<IActionResult> CreateTag([FromBody]TagDataViewModel tagDataVm)
        {
            if (_tagService.IsTagExist())
            {
                await _tagService.UpdateTag(tagDataVm);
            }
            else
            {
                await _tagService.CreateTag(tagDataVm);
            }
            return Ok();
        }
    }
}