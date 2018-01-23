using Microsoft.AspNetCore.Mvc;

namespace AwesomeCMSCore.Modules.Client.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
