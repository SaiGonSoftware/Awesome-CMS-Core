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
        
        public async Task<IActionResult> GetTag()
        {
            return Ok(await _tagService.GetAllTag());
        }

        [HttpPost]
        public async Task<IActionResult> CreateTag(string tagData)
        {
            if (string.IsNullOrEmpty(tagData))
            {
                return BadRequest();
            }

            var tagNameList = JsonConvert.DeserializeObject<IEnumerable<string>>(tagData) ?? Enumerable.Empty<string>();

            var nameList = tagNameList as string[] ?? tagNameList.ToArray();

            if (!nameList.Any() || nameList.GroupBy(x => x).Any(x => x.Count() > 1))
            {
                return BadRequest();
            }

            await _tagService.CreateTag(tagData);
            return Ok();
        }
    }
}