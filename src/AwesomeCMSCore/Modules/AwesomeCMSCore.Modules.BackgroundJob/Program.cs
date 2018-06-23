using System;
using System.IO;
using AwesomeCMSCore.Modules.Helper.Extensions;
using Hangfire;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AwesomeCMSCore.Modules.BackgroundJob
{
    public class Program
    {
        public static void Main()
        {
            var serviceCollection = new ServiceCollection();
            ConfigureServices(serviceCollection);

            // create service provider
            var serviceProvider = serviceCollection.BuildServiceProvider();

            // entry to run app
            serviceProvider.GetService<BackgroundJob>().Run();
        }

        private static void ConfigureServices(IServiceCollection serviceCollection)
        {
            var currentDir = ProjectPath.GetApplicationRoot();

            // build configuration
            var configuration = new ConfigurationBuilder()
                .SetBasePath(currentDir)
                .AddJsonFile("appsettings.json", false)
                .Build();
            serviceCollection.AddOptions();
            serviceCollection.Configure<BackgroundJobSettings>(configuration.GetSection("BackgroundJobSettings"));

            // add app
            serviceCollection.AddTransient<BackgroundJob>();
        }
    }
}
