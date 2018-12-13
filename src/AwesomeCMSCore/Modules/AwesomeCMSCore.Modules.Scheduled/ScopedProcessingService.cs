using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Logging;

namespace AwesomeCMSCore.Modules.Scheduled
{
	public interface IScopedProcessingService
	{
		void DoWork();
	}

	public class ScopedProcessingService : IScopedProcessingService
	{
		private readonly ILogger _logger;

		public ScopedProcessingService(ILogger<ScopedProcessingService> logger)
		{
			_logger = logger;
		}

		public void DoWork()
		{
			_logger.LogInformation("Scoped Processing Service is working.");
		}
	}
}
