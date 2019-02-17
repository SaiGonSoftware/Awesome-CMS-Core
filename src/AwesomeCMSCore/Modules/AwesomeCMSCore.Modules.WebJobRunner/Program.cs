using System;
using System.IO;
using AwesomeCMSCore.Modules.Helper.Extensions;
using AwesomeCMSCore.Modules.Queue.Settings;
using AwesomeCMSCore.Modules.WebJob.Settings;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AwesomeCMSCore.Modules.WebJobRunner
{
    public static class Program
    {
		public static IConfigurationRoot Configuration;

		public static void Main()
        {
            var serviceCollection = new ServiceCollection();
            ConfigureServices(serviceCollection);

            // create service provider
            var serviceProvider = serviceCollection.BuildServiceProvider();

            // entry to run app
            //serviceProvider.GetService<WebJob>().RunQueue();
			//serviceProvider.GetService<WebJob>().Run();
			serviceProvider.GetService<WebJob>().RunImageProcessQueue();
			Console.ReadLine();
        }

        private static void ConfigureServices(IServiceCollection serviceCollection)
        {
			var currentDir = Directory.GetCurrentDirectory();

			// build configuration
			var configuration = new ConfigurationBuilder()
                .SetBasePath(currentDir)
                .AddJsonFile("appsettings.json", false)
                .Build();
            serviceCollection.AddOptions();

            serviceCollection.Configure<WebJobSettings>(settings => configuration.GetSection("WebJobSettings"));
            serviceCollection.Configure<QueueSettings>(settings => configuration.GetSection("QueueSettings"));

			// add app
			serviceCollection.AddTransient<WebJob>();
        }
    }
}