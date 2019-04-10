using AwesomeCMSCore.Modules.Helper.Services;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore.Internal;

namespace AwesomeCMSCore.Modules.Helper.Filter
{
	public class RoleFilterAttribute : ActionFilterAttribute
	{
		private readonly UserService _userService = new UserService();

		public override void OnActionExecuting(ActionExecutingContext context)
		{
			base.OnActionExecuting(context);
			var currentUserRole = _userService.GetCurrentUserRoles();
			if (!currentUserRole.Any())
			{
				context.HttpContext.Response.Redirect("/Error/403");
			}
		}
	}
}
