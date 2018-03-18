using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Admin.Services;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Helper.Filter;
using AwesomeCMSCore.Modules.Helper.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AwesomeCMSCore.Modules.Admin.Controllers.API
{
    [Authorize]
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

        [HttpPost, ValidModel]
        public async Task<IActionResult> CreateTag(string tagName)
        {
            await _tagService.CreateTag(tagName);
            return Ok();
        }
    }
}