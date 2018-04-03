using System;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Helper.ExceptionHandler;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace AwesomeCMSCore.Modules.Helper.Controllers
{
    public class ErrorController: Controller
    {
        private readonly IExceptionHandler _exceptionHandler;
        public ErrorController(IExceptionHandler exceptionHandler)
        {
            _exceptionHandler = exceptionHandler;
        }

        [HttpGet("/Error/{statusCode}")]
        public async Task<IActionResult> Index(int statusCode)
        {
            var exceptionFeature = HttpContext.Features.Get<IExceptionHandlerPathFeature>();
            var exceptionThatOccurred = exceptionFeature.Error;
            await _exceptionHandler.HandleExceptionAsync(exceptionThatOccurred);
            return View(statusCode);
        }
    }
}
