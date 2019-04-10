using System.Text;
using AwesomeCMSCore.Modules.Queue.Settings;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using RabbitMQ.Client;

namespace AwesomeCMSCore.Modules.Queue.Services
{
	public class QueueService : IQueueService
	{
		private readonly IOptions<QueueSettings> _queueSetting;

		public QueueService(IOptions<QueueSettings> queueSetting)
		{
			_queueSetting = queueSetting;
		}

		/// <summary>
		/// The default exchange is a direct exchange with no name (empty string) pre-declared by the broker
		/// For example, when you declare a queue with the name of "search-indexing-online",
		/// the AMQP 0-9-1 broker will bind it to the default exchange using "search-indexing-online" as the routing key (in this context sometimes referred to as the binding key). 
		/// Therefore, a message published to the default exchange with the routing key "search-indexing-online" will be routed to the queue "search-indexing-online". 
		/// </summary>
		/// <param name="queueOptions"></param>
		public void PublishMessage(QueueOptions queueOptions)
		{
			var mess = string.Empty;

			var factory = new ConnectionFactory()
			{
				HostName = _queueSetting.Value.Host,
				UserName = _queueSetting.Value.Username,
				Password = _queueSetting.Value.Password,
			};

			using (var connection = factory.CreateConnection())
			using (var channel = connection.CreateModel())
			{
				channel.QueueDeclare(queue: queueOptions.QueueName,
					durable: true,
					exclusive: false,
					autoDelete: false,
					arguments: null);

				if (queueOptions.IsObject)
				{
					//update later to handle object pass to queue
					mess = JsonConvert.SerializeObject(new QueueMessage { Message = queueOptions.Message });
				}

				var body = Encoding.UTF8.GetBytes(mess == string.Empty ? queueOptions.Message : mess);

				// Message durability setup
				var properties = channel.CreateBasicProperties();
				properties.Persistent = true;

				channel.BasicPublish(exchange: queueOptions.ExchangeType,
					routingKey: queueOptions.RoutingKey,
					basicProperties: properties,
					body: body);
			}
		}
	}
}
