using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Admin.Services;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Helper.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AwesomeCMSCore.Modules.Admin.Controllers
{
    [Authorize]
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

        public IActionResult Index()
        {
            var data = _userService.GetCurrentUserIdAsync();
            return View();
        }

        //public async Task<IActionResult> CreateTag([FromBody] Tag tagModel)
        //{
        //    return await _tagService.CreateTag(tagModel, currentUserId);
        //}
    }
}