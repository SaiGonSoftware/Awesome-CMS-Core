using System.IO;
using System.Text.RegularExpressions;

namespace AwesomeCMSCore.Modules.Helper.Extensions
{
	public static class ProjectPath
	{
		public static string GetApplicationRoot()
		{
			var exePath = Path.GetDirectoryName(System.Reflection
				.Assembly.GetExecutingAssembly().CodeBase);
			Regex appPathMatcher = new Regex(@"(?<!fil)[A-Za-z]:\\+[\S\s]*?(?=\\+bin)");
			var appRoot = appPathMatcher.Match(exePath).Value;
			return appRoot;
		}

		public static string ToApplicationPath(this string fileName)
		{
			var exePath = Path.GetDirectoryName(System.Reflection
				.Assembly.GetExecutingAssembly().CodeBase);
			Regex appPathMatcher = new Regex(@"(?<!fil)[A-Za-z]:\\+[\S\s]*?(?=\\+bin)");
			var appRoot = appPathMatcher.Match(exePath).Value;
			return Path.Combine(appRoot, fileName);
		}
	}
}
