using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Background.BaseBackground;
using Microsoft.Extensions.DependencyInjection;
using NCrontab;

namespace AwesomeCMSCore.Modules.Scheduled.BaseScheduled
{
	public abstract class ScheduledProcessor : ScopedProcessor
	{
		private readonly CrontabSchedule _schedule;
		private DateTime _nextRun;

		protected ScheduledProcessor(IServiceScopeFactory serviceScopeFactory) : base(serviceScopeFactory)
		{
			_schedule = CrontabSchedule.Parse(GetCronExpression());
			_nextRun = _schedule.GetNextOccurrence(DateTime.Now);
		}

		protected override async Task ExecuteAsync(CancellationToken stoppingToken)
		{
			do
			{
				var now = DateTime.Now;
				_schedule.GetNextOccurrence(now);

				if (now > _nextRun)
				{
					await ProcessBackgroundTask();
					_nextRun = _schedule.GetNextOccurrence(DateTime.Now);
				}

				await Task.Delay(5000, stoppingToken);
			}
			while (!stoppingToken.IsCancellationRequested);
		}

		protected abstract string GetCronExpression();
	}
}
