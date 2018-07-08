using AwesomeCMSCore.Modules.Helper.Filter;
using AwesomeCMSCore.Modules.Helper.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AwesomeCMSCore.Modules.Admin.Controllers
{
    [Authorize, RoleFilter]
    public class PortalController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
    }
}