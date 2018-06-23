using System;
using System.Collections.Generic;
using System.Text;
using Hangfire;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace AwesomeCMSCore.Modules.BackgroundJob
{
    public class BackgroundJob
    {
        private readonly IOptions<BackgroundJobSettings> _connectionStringSetting;

        public BackgroundJob(IOptions<BackgroundJobSettings> connectionStringSetting)
        {
            _connectionStringSetting = connectionStringSetting;
        }

        public void Run()
        {
            GlobalConfiguration.Configuration.UseSqlServerStorage(_connectionStringSetting.Value.DBConnectionString);

            using (var server = new BackgroundJobServer())
            {
                Console.WriteLine("Hangfire Server started. Press any key to exit...");
                Console.ReadKey();
            }
        }
    }
}
