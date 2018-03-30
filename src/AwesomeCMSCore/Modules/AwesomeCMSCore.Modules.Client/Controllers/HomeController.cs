using AwesomeCMSCore.Modules.Queue;
using Microsoft.AspNetCore.Mvc;

namespace AwesomeCMSCore.Modules.Client.Controllers
{
    public class HomeController : Controller
    {
        private IQueueService _queueService;
        public HomeController(IQueueService queueService)
        {
            _queueService = queueService;
        }

        public IActionResult Index()
        {
            _queueService.PublishMessage("hello","test","hello");
            return View();
        }
    }
}
