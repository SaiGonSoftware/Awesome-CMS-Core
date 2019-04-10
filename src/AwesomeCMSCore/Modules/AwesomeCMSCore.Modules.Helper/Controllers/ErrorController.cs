using System.Net;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Helper.ExceptionHandler;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace AwesomeCMSCore.Modules.Helper.Controllers
{
	[ApiExplorerSettings(IgnoreApi = true)]
	public class ErrorController : Controller
	{
		private readonly IExceptionHandler _exceptionHandler;
		public ErrorController(IExceptionHandler exceptionHandler)
		{
			_exceptionHandler = exceptionHandler;
		}

		[HttpGet("/Error/{statusCode}")]
		public async Task<IActionResult> Index(int statusCode)
		{
			if (statusCode == (int)HttpStatusCode.InternalServerError)
			{
				var exceptionFeature = HttpContext.Features.Get<IExceptionHandlerPathFeature>();
				var exceptionThatOccurred = exceptionFeature.Error;
				await _exceptionHandler.HandleExceptionAsync(exceptionThatOccurred);
			}
			return View(statusCode);
		}
	}
}
