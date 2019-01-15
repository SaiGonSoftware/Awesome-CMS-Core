using System.IO;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Admin.Repositories;
using AwesomeCMSCore.Modules.Admin.ViewModels;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Helper.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AwesomeCMSCore.Modules.Admin.Controllers.API.V1
{
	[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
	[ApiVersion("1.0")]
	[ApiExplorerSettings(GroupName = "v1")]
	[Route("api/v{version:apiVersion}/Post/")]
	public class PostController : Controller
	{
		private readonly IPostRepository _postRepository;

		public PostController(
			IPostRepository postRepository,
			IUserService userService)
		{
			_postRepository = postRepository;
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
		[AllowAnonymous]
		public async Task<IActionResult> SavePost([FromBody] PostViewModel viewModel, [FromBody] IFormFile Thumbnail)
		{
			if (viewModel.Id.HasValue)
			{
				await _postRepository.EditPost(viewModel);
			}
			else
			{
				var path = Path.Combine(
				  Directory.GetCurrentDirectory(), "wwwroot/assets/",
				  viewModel.Media.Name);
				using (var stream = new FileStream(path, FileMode.Create))
				{
					await Thumbnail.CopyToAsync(stream);
				}
				//await _postRepository.SavePost(viewModel);
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