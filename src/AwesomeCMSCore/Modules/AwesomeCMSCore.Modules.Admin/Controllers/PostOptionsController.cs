using AwesomeCMSCore.Modules.Admin.Repositories;
using AwesomeCMSCore.Modules.Helper.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AwesomeCMSCore.Modules.Admin.Controllers
{
	[Authorize]
	public class PostOptionsController : Controller
	{
		private readonly IPostOptionsRepository _postOptionsRepository;
		private readonly IUserService _userService;

		public PostOptionsController(
			IPostOptionsRepository postOptionsRepository,
			IUserService userService)
		{
			_postOptionsRepository = postOptionsRepository;
			_userService = userService;
		}

		public IActionResult Index()
		{
			return View();
		}
	}
}