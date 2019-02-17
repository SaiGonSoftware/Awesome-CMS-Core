using System;
using System.Text;
using AwesomeCMSCore.Modules.Queue.Settings;
using AwesomeCMSCore.Modules.WebJob.Settings;
using Hangfire;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;

namespace AwesomeCMSCore.Modules.WebJobRunner
{
    public class WebJob
    {
        private readonly IOptions<WebJobSettings> _webJobSettings;
        private readonly IOptions<QueueSettings> _queueSettings;
        public WebJob(
            IOptions<WebJobSettings> webJobSettings,
            IOptions<QueueSettings> queueSettings)
        {
            _webJobSettings = webJobSettings;
            _queueSettings = queueSettings;
        }

        public void Run()
        {
            GlobalConfiguration.Configuration.UseSqlServerStorage(_webJobSettings.Value.DbConnectionString);

            using (var server = new BackgroundJobServer())
            {
                Console.WriteLine("Hangfire Server started. Press any key to exit...");
                //Console.ReadLine();
            }
        }

        /// <summary>
        /// This is just for testing 
        /// To make sure message arent lost need to mark both queue as durable: true
        /// Tun on message ack we need to change it to false
        /// </summary>
        public void RunQueue()
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.QueueDeclare(queue: "hellojob",
                    durable: true,
                    exclusive: false,
                    autoDelete: false,
                    arguments: null);

                //Fair dispatch setup
                channel.BasicQos(prefetchSize: 0, prefetchCount: 1, global: false);
                Console.WriteLine(" [*] Waiting for messages.");

                var consumer = new EventingBasicConsumer(channel);
                consumer.Received += (model, ea) =>
                {
                    var body = ea.Body;
                    dynamic message = JsonConvert.DeserializeObject(Encoding.UTF8.GetString(body));
                    Console.WriteLine(" [x] Received {0}", message.Message);

                    channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);
                };

                channel.BasicConsume(queue: "hellojob",
                    autoAck: false,
                    consumer: consumer);

                Console.WriteLine(" Press [enter] to exit.");
                //Console.ReadLine();
            }

        }

		public void RunImageProcessQueue()
		{
			var factory = new ConnectionFactory() { HostName = "localhost" };
			using (var connection = factory.CreateConnection())
			using (var channel = connection.CreateModel())
			{
				channel.QueueDeclare(queue: QueueName.ImageResizeProcessing.ToString(),
					durable: true,
					exclusive: false,
					autoDelete: false,
					arguments: null);

				//Fair dispatch setup
				channel.BasicQos(prefetchSize: 0, prefetchCount: 1, global: false);
				Console.WriteLine(" [*] Waiting for messages.");

				var consumer = new EventingBasicConsumer(channel);
				consumer.Received += (model, ea) =>
				{
					var body = ea.Body;
					var message = Encoding.UTF8.GetString(body);
					Console.WriteLine(" [x] Received {0}", message);
					//using (var image = Image.Load(message))
					//{
					//	image.Mutate(x => x
					//		 .Resize(image.Width / 2, image.Height / 2)
					//		 .Grayscale());
					//	image.Save("bar.jpg"); // Automatic encoder selected based on extension.
					//}
					channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);
				};

				channel.BasicConsume(queue: QueueName.ImageResizeProcessing.ToString(),
					autoAck: false,
					consumer: consumer);

				Console.WriteLine(" Press [enter] to exit.");
				Console.ReadLine();
			}
		}
	}
}
