using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Admin.Repositories;
using AwesomeCMSCore.Modules.Admin.ViewModels;
using AwesomeCMSCore.Modules.Helper.Filter;
using AwesomeCMSCore.Modules.Helper.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AwesomeCMSCore.Modules.Admin.Controllers.API.V1
{
	[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
	[ApiVersion("1.0")]
	[ApiExplorerSettings(GroupName = "v1")]
	[Route("api/v{version:apiVersion}/PostOptions/")]
	public class PostOptionsController : Controller
	{
		private readonly IPostOptionsRepository _postOptionsRepository;
		private readonly IUserService _userService;

		public PostOptionsController(
			IPostOptionsRepository postOptionsRepository,
			IUserService userService)
		{
			_postOptionsRepository = postOptionsRepository;
			_userService = userService;
		}

		[HttpGet("Options")]
		public async Task<IActionResult> GetAllOptions()
		{
			return Ok(await _postOptionsRepository.GetAllOptions());
		}

		[HttpGet("Tag")]
		public async Task<IActionResult> Tag()
		{
			return Ok(await _postOptionsRepository.GetAllTag());
		}

		[HttpPost("Tag"), ValidModel]
		public async Task<IActionResult> CreateTag([FromBody]PostOptionsViewModel tagDataVm)
		{
			if (_postOptionsRepository.IsTagExist())
			{
				await _postOptionsRepository.UpdateTag(tagDataVm);
			}
			else
			{
				await _postOptionsRepository.CreateTag(tagDataVm);
			}
			return Ok();
		}

		[HttpGet("Categories")]
		public async Task<IActionResult> Categories()
		{
			return Ok(await _postOptionsRepository.GetAllCategories());
		}

		[HttpPost("Categories"), ValidModel]
		public async Task<IActionResult> CreateCategories([FromBody]PostOptionsViewModel categoriesVm)
		{
			if (_postOptionsRepository.IsCategoriesExist())
			{
				await _postOptionsRepository.UpdateCategories(categoriesVm);
			}
			else
			{
				await _postOptionsRepository.CreateCategories(categoriesVm);
			}
			return Ok();
		}
	}
}