using System.Threading.Tasks;
using AuthorizationServer.Models;
using AuthorizationServer.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AuthorizationServer.Controllers
{
    [Authorize]
    public class TestController : Controller 
    {
        public IActionResult Index() 
        {
            return View();
        }
    }
}