using System;
using System.Text;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Queue;
using EasyNetQ;
using EasyNetQ.MessageVersioning;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace AwesomeCMSCore.Modules.WebJob
{
    public class Program
    {
        /// <summary>
        /// This is just for testing 
        /// To make sure message arent lost need to mark both queue as durable: true
        /// Tun on message ack we need to change it to false
        /// </summary>
        public static void Main()
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
                Console.ReadLine();
            }
        }
    }
}