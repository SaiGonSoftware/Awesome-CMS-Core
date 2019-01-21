using System.IO;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Admin.Repositories;
using AwesomeCMSCore.Modules.Admin.ViewModels;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Helper.Extensions;
using AwesomeCMSCore.Modules.Helper.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace AwesomeCMSCore.Modules.Admin.Controllers.API.V1
{
	[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
	[ApiVersion("1.0")]
	[ApiExplorerSettings(GroupName = "v1")]
	[Route("api/v{version:apiVersion}/Post/")]
	public class PostController : Controller
	{
		private readonly IPostRepository _postRepository;
		private readonly IJsonParseService<PostOptionsDefaultViewModel> _jsonParsePostOptionDefaultVm;
		public PostController(
			IPostRepository postRepository,
			IUserService userService,
			IJsonParseService<PostOptionsDefaultViewModel> jsonParsePostOptionDefaultVm)
		{
			_postRepository = postRepository;
			_jsonParsePostOptionDefaultVm = jsonParsePostOptionDefaultVm;
		}

		[HttpGet("")]
		public async Task<IActionResult> GetPosts()
		{
			var postList = await _postRepository.GetPostsDefaultViewModel();
			return Ok(postList);
		}

		[HttpGet("{postId}")]
		public async Task<IActionResult> GetPost(int postId)
		{
			var post = await _postRepository.GetPost(postId);
			return Ok(post);
		}

		[HttpPost("SavePost")]
		public async Task<IActionResult> SavePost([FromForm]PostViewModel viewModel)
		{
			var postOptionsViewModel = _jsonParsePostOptionDefaultVm.ToObject(viewModel.PostOptionsViewModel);
			viewModel.PostOptionsDefaultViewModel = postOptionsViewModel;

			if (viewModel.Id.HasValue)
			{
				await _postRepository.EditPost(viewModel);
			}
			else
			{
				var path = Path.Combine(
				  Directory.GetCurrentDirectory(), "wwwroot\\assets",
				  viewModel.Thumbnail.GetFilename());
				using (var stream = new FileStream(path, FileMode.Create))
				{
					await viewModel.Thumbnail.CopyToAsync(stream);
				}
				await _postRepository.SavePost(viewModel);
			}

			return Ok();
		}

		[HttpPut("{postId}")]
		public async Task<IActionResult> RestorePost(int postId)
		{
			await _postRepository.RestorePost(postId);
			return Ok();
		}

		[HttpDelete("{postId}")]
		public async Task<IActionResult> DeletePost(int postId)
		{
			await _postRepository.DeletePost(postId);
			return Ok();
		}
	}
}