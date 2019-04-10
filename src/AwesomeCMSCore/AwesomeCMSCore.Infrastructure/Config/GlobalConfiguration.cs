using AwesomeCMSCore.Infrastructure.Module;
using System.Collections.Generic;

namespace AwesomeCMSCore.Infrastructure.Config
{
	public static class GlobalConfiguration
	{
		static GlobalConfiguration()
		{
			Modules = new List<ModuleInfo>();
		}

		public static IList<ModuleInfo> Modules { get; set; }

		public static string WebRootPath { get; set; }

		public static string ContentRootPath { get; set; }
	}
}
