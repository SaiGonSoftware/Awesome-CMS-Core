using Microsoft.AspNetCore.Mvc;

namespace AwesomeCMSCore.Modules.Shared.Controllers.V1
{
	[ApiVersion("1.0")]
	[ApiExplorerSettings(GroupName = "v1")]
	[Route("api/v{version:apiVersion}/NewLetter/")]
	public class NewsLetterController : Controller
	{
		public NewsLetterController()
		{

		}
	}
}
