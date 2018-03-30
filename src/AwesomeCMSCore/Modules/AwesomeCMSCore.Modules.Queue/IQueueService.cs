namespace AwesomeCMSCore.Modules.Queue
{
    public interface IQueueService
    {
        void PublishMessage(string queueName, string message, string routingKey, string exchangeType = "");
    }
}
