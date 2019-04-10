using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Admin.Repositories;
using AwesomeCMSCore.Modules.Admin.ViewModels;
using AwesomeCMSCore.Modules.Entities.Enums;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AwesomeCMSCore.Modules.Admin.Controllers.API.V1
{
	[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
	[ApiVersion("1.0")]
	[ApiExplorerSettings(GroupName = "v1")]
	[Route("api/v{version:apiVersion}/Comments/")]
	public class CommentController : Controller
	{
		private readonly ICommentRepository _commentRepository;
		public CommentController(ICommentRepository commentRepository)
		{
			_commentRepository = commentRepository;
		}

		[HttpGet("")]
		public async Task<IActionResult> GetAll()
		{
			var comments = await _commentRepository.GetAllComments();
			return Ok(comments);
		}

		[HttpPut("{commentId}/{CommentStatus}")]
		public async Task<IActionResult> UpdateCommentStatus(int commentId, CommentStatus commentStatus)
		{
			var result = await _commentRepository.UpdateCommentStatus(commentId, commentStatus);
			if (result)
			{
				return Ok();
			}

			return BadRequest();
		}

		[HttpPost("{commentId}/reply")]
		public async Task<IActionResult> ReplyComment([FromBody]CommentReplyViewModel replyViewModel)
		{
			var result = await _commentRepository.ReplyComment(replyViewModel);
			if (result)
			{
				return Ok();
			}

			return BadRequest();
		}
	}
}