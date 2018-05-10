using AwesomeCMSCore.Modules.Queue;
using Microsoft.AspNetCore.Mvc;

namespace AwesomeCMSCore.Modules.Client.Controllers
{
    public class HomeController : Controller
    {
        private readonly IQueueService _queueService;
        public HomeController(IQueueService queueService)
        {
            _queueService = queueService;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
    }
}
