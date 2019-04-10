using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace AwesomeCMSCore.Modules.Helper.ProtectPath
{
	public class ProtectFolder
	{
		private readonly RequestDelegate _next;
		private readonly PathString _path;

		public ProtectFolder(RequestDelegate next, ProtectFolderOptions options)
		{
			_next = next;
			_path = options.Path;
		}

		public async Task Invoke(HttpContext httpContext)
		{
			if (httpContext.Request.Path.StartsWithSegments(_path))
			{
				httpContext.Response.StatusCode = 401;
				return;
			}

			await _next(httpContext);
		}
	}
}