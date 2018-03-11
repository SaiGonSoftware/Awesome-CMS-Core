using System;
using Microsoft.AspNetCore.Mvc;

namespace AwesomeCMSCore.Modules.Client.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            throw new Exception("sadasd");
            return View();
        }
    }
}
