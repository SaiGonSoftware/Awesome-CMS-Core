using System;
using MassTransit;
using SimpleMassTransitRabbitMQHelloWorld.Messages;

namespace SimpleMassTransitRabbitMQHelloWorld.Worker
{
    public class ComplextMessageConsumer : Consumes<ComplexMessage>.Context
    {
        public void Consume(IConsumeContext<ComplexMessage> message)
        {
            //***** If you want to simulate some complex processing use this *****\\
            //Random random = new Random();
            //Thread.Sleep(random.Next(500, 1500));
            
            Console.WriteLine(message.Message.ComplexBody);
        }
    }
}