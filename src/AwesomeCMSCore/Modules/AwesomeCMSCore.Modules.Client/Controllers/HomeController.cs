using AwesomeCMSCore.Modules.Queue.Services;
using AwesomeCMSCore.Modules.Queue.Settings;
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
			var queueOptions = new QueueOptions
			{
				Message = "test",
				QueueName = "hello",
				RoutingKey = "hello"
			};
			_queueService.PublishMessage(queueOptions);
			_logger.LogInformation("Index page says hello");
			return View();
        }
    }
}
