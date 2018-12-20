using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace AwesomeCMSCore.Modules.Background.BaseBackground
{
	public abstract class ScopedProcessor : HostedService
	{
		private readonly IServiceScopeFactory _serviceScopeFactory;

		protected ScopedProcessor(IServiceScopeFactory serviceScopeFactory) : base()
		{
			_serviceScopeFactory = serviceScopeFactory;
		}

		protected override async Task ProcessBackgroundTask()
		{
			using (var scope = _serviceScopeFactory.CreateScope())
			{
				await ProcessInScope(scope.ServiceProvider);
			}
		}

		public abstract Task ProcessInScope(IServiceProvider serviceProvider);
	}
}
