using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Admin.Services;
using AwesomeCMSCore.Modules.Helper.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AwesomeCMSCore.Modules.Admin.Controllers.API
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]/[action]")]
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

        [HttpPost]
        public async Task<IActionResult> CreateTag(string tagName)
        {
            var tagNameList = JsonConvert.DeserializeObject<IEnumerable<string>>(tagName) ?? Enumerable.Empty<string>();
            if (!tagNameList.Any()) return BadRequest();
            await _tagService.CreateTag(tagName);
            return Ok();
        }
    }
}