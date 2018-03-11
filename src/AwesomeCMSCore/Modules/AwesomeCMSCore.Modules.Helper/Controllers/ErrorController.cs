using System;
using System.Net;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;

namespace AwesomeCMSCore.Modules.Helper.Controllers
{
    public class ErrorController: Controller
    {
        [HttpGet("/Error/{statusCode}")]
        public IActionResult Index(int statusCode)
        {
            return View(statusCode);
        }
    }
}
