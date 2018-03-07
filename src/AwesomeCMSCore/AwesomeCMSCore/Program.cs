using AwesomeCMSCore.Extension;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using NLog;
using NLog.Web;

namespace AwesomeCMSCore
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var logger = LogManager.LoadConfiguration("nlog.config").GetCurrentClassLogger();
            logger.Debug("init main");
            var host = BuildWebHost(args);
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                SeedData.Initialize(services).Wait();
            }

            host.Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .ConfigureLogging(logging =>
                {
                    logging.ClearProviders();
                    logging.SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Trace);
                })
                .UseNLog()
                .Build();
    }
}
