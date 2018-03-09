using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace AwesomeCMSCore.Modules.Helper.Controllers
{
    public class ErrorController: Controller
    {

        // GET: /<controller>/
        [HttpGet("/Error/{statusCode}")]
        public IActionResult Index(int statusCode)
        {
            var reExecute = HttpContext.Features.Get<IStatusCodeReExecuteFeature>();
            return View(statusCode);
        }
    }
}
