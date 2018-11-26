using AwesomeCMSCore.Modules.Entities.Data;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System;
using NLog.Web;
using Microsoft.Extensions.Logging;

namespace AwesomeCMSCore
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var logger = NLogBuilder.ConfigureNLog("nlog.config").GetCurrentClassLogger();
			try
			{
				logger.Debug("init main");
				var host = BuildWebHost(args);
				using (var scope = host.Services.CreateScope())
				{
					var services = scope.ServiceProvider;
					SeedData.Initialize(services).Wait();
				}

				host.Run();
			}
			catch (Exception ex)
			{
				//NLog: catch setup errors
				logger.Error(ex, "Stopped program because of exception");
				throw;
			}
			finally
			{
				// Ensure to flush and stop internal timers/threads before application-exit (Avoid segmentation fault on Linux)
				NLog.LogManager.Shutdown();
			}
		}

		public static IWebHost BuildWebHost(string[] args) =>
				WebHost.CreateDefaultBuilder(args)
					.UseStartup<Startup>()
					.ConfigureLogging(logging =>
					{
						logging.ClearProviders();
						logging.SetMinimumLevel(LogLevel.Trace);
					})
					.UseNLog()  // NLog: setup NLog for Dependency injection
					.Build();
	}
}