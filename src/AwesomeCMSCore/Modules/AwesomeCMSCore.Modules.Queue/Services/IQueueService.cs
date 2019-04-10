using AwesomeCMSCore.Modules.Queue.Settings;

namespace AwesomeCMSCore.Modules.Queue.Services
{
	public interface IQueueService
	{
		void PublishMessage(QueueOptions queueOptions);
	}
}
