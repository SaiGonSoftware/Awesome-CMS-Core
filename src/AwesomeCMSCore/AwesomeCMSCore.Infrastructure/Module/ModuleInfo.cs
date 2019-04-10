using System.Linq;
using System.Reflection;

namespace AwesomeCMSCore.Infrastructure.Module
{
	public class ModuleInfo
	{
		public string Name { get; set; }

		public Assembly Assembly { get; set; }

		public string ShortName
		{
			get
			{
				return Name.Split('.').Last();
			}
		}

		public string Path { get; set; }
	}
}
