using Microsoft.AspNetCore.Builder;

namespace AwesomeCMSCore.Modules.Helper.ProtectPath
{
	public static class ProtectFolderExtensions
	{
		public static IApplicationBuilder UseProtectFolder(
			this IApplicationBuilder builder,
			ProtectFolderOptions options)
		{
			return builder.UseMiddleware<ProtectFolder>(options);
		}
	}
}