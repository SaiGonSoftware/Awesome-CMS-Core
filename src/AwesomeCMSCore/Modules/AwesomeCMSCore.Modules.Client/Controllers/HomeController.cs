using AwesomeCMSCore.Modules.Queue.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AwesomeCMSCore.Modules.Client.Controllers
{
	public class HomeController : Controller
	{
		private readonly IQueueService _queueService;
		private readonly ILogger<HomeController> _logger;

		public HomeController(
			IQueueService queueService,
			ILogger<HomeController> logger)
		{
			_queueService = queueService;
			_logger = logger;
		}

		[HttpGet]
		public IActionResult Index()
		{
			return View();
		}
	}
}
