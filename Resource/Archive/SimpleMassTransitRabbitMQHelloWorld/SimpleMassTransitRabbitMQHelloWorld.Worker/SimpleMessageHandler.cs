using System;
using MassTransit;
using MassTransit.Context;
using SimpleMassTransitRabbitMQHelloWorld.Messages;

namespace SimpleMassTransitRabbitMQHelloWorld.Worker
{
    public class SimpleMessageHandler  : ConsumeContext<SimpleMessage>
    {
        public SimpleMessageHandler(IReceiveContext context, SimpleMessage message) : base(context, message)
        {
        }

        public static void Handle(SimpleMessage message)
        {
            Console.WriteLine("Handler got the message {0}", message.Body );
        }
    }
}
