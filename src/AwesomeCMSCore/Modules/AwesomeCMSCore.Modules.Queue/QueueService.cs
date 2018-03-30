using Microsoft.Extensions.Options;
using RabbitMQ.Client;
using System.Text;
using EasyNetQ;
using Newtonsoft.Json;

namespace AwesomeCMSCore.Modules.Queue
{
    public class QueueService : IQueueService
    {
        private readonly IOptions<QueueSettings> _queueSetting;

        public QueueService(IOptions<QueueSettings> queueSetting)
        {
            _queueSetting = queueSetting;
        }


        public void PublishMessage(string queueName, string message, string routingKey, string exchangeType = "")
        {
            var factory = new ConnectionFactory()
            {
                HostName = _queueSetting.Value.Host,
                UserName = _queueSetting.Value.Username,
                Password = _queueSetting.Value.Password,
            };

            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.QueueDeclare(queue: queueName,
                    durable: true,
                    exclusive: false,
                    autoDelete: false,
                    arguments: null);

                var mess = JsonConvert.SerializeObject(new QueueMessage {Message = message});
                var body = Encoding.UTF8.GetBytes(mess);

                // Message durability setup
                var properties = channel.CreateBasicProperties();
                properties.Persistent = true;

                channel.BasicPublish(exchange: exchangeType,
                    routingKey: routingKey,
                    basicProperties: properties,
                    body: body);
            }
        }
    }
}
