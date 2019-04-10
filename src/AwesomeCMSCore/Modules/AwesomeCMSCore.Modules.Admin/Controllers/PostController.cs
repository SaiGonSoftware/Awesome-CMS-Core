using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AwesomeCMSCore.Modules.Admin.Controllers
{
	[Authorize]
	public class PostController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}

		public IActionResult NewPost()
		{
			return View();
		}
	}
}
