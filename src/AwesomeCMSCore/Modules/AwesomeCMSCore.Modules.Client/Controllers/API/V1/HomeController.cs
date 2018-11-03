using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Client.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AwesomeCMSCore.Modules.Client.Controllers.API.V1
{
	[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
	[ApiVersion("1.0")]
	[ApiExplorerSettings(GroupName = "v1")]
	[Route("api/v{version:apiVersion}/Index/")]
	public class HomeController : Controller
	{
		private readonly IPostRepository _postRepository;
		public HomeController(IPostRepository postRepository)
		{
			_postRepository = postRepository;
		}

		[HttpGet("")]
		[AllowAnonymous]
		public async Task<IActionResult> GetAll()
		{
			var vm = await _postRepository.GetIndexViewModel();
			return Ok(vm);
		}
	}
}