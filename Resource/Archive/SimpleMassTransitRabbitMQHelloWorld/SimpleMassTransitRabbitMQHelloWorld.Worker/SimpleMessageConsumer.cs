using System;
using MassTransit;
using SimpleMassTransitRabbitMQHelloWorld.Messages;

namespace SimpleMassTransitRabbitMQHelloWorld.Worker
{
    public class SimpleMessageConsumer : Consumes<SimpleMessage>.Context
    {
        public void Consume(IConsumeContext<SimpleMessage> incomingMessage)
        {
            Console.WriteLine(incomingMessage.Message.Body);
        }
    }
}
