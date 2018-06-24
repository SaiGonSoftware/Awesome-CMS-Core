namespace AwesomeCMSCore.Modules.Queue.Services
{
    public interface IQueueService
    {
        void PublishMessage(string queueName, string message, string routingKey, string exchangeType = "");
    }
}
