using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Helper.Enum;
using AwesomeCMSCore.Modules.Helper.Filter;
using AwesomeCMSCore.Modules.Shared.Models;
using AwesomeCMSCore.Modules.Shared.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace AwesomeCMSCore.Modules.Shared.Controllers.V1
{
	[ApiVersion("1.0")]
	[ApiExplorerSettings(GroupName = "v1")]
	[Route("api/v{version:apiVersion}/NewLetter/")]
	public class NewsLetterController : Controller
	{
		private readonly INewsLetterRepository _newsLetterRepository;
		public NewsLetterController(INewsLetterRepository newsLetterRepository)
		{
			_newsLetterRepository = newsLetterRepository;
		}

		[HttpPost("Register"), ValidModel]
		public async Task<IActionResult> RegisterNewLetter([FromBody]EmailRegisterModel emailRegisterModel)
		{
			if (_newsLetterRepository.IsEmailRegistered(emailRegisterModel.Email))
			{
				return StatusCode(AppStatusCode.EmailRegistered);
			}

			var result = await _newsLetterRepository.RegisterSubscriptionEmail(emailRegisterModel.Email);

			if (!result)
			{
				return BadRequest();
			}

			return Ok();
		}
	}
}
