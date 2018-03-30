using System;
using MassTransit;
using SimpleMassTransitRabbitMQHelloWorld.Messages;

namespace SimpleMassTransitRabbitMQHelloWorld.Sender
{
    class Program
    {
        static void Main(string[] args)
        {
            IServiceBus bus = ServiceBusFactory.New(cfg =>
            {
                cfg.UseRabbitMq();
                cfg.ReceiveFrom("rabbitmq://localhost/nodogmablog_queue_sender");
            });

            string messageText = "";
            Console.Write("Type 'exit' to exit\n\n");

            while (messageText.ToLower() != "exit")
            {
                Console.Write("Enter message to send: ");
                messageText = Console.ReadLine();

                var simpleMessage = new SimpleMessage() { Body = messageText };
                bus.Publish<SimpleMessage>(simpleMessage, pubContext =>
                {
                    //pubContext.SetHeader("Header1", "some value");
                    pubContext.SetDeliveryMode(DeliveryMode.Persistent);
                });
            }

            bus.Dispose();
        }
    }
}