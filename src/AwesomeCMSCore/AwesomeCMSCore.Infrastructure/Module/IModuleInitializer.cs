using Microsoft.Extensions.DependencyInjection;

namespace AwesomeCMSCore.Infrastructure.Module
{
	public interface IModuleInitializer
	{
		void Init(IServiceCollection serviceCollection);
	}
}
