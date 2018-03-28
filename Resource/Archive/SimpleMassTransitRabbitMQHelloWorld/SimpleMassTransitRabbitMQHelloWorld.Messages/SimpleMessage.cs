using System;
using MassTransit;

namespace SimpleMassTransitRabbitMQHelloWorld.Messages
{
    public class SimpleMessage : CorrelatedBy<Guid>
    {
        public SimpleMessage()
        {
            CorrelationId = Guid.NewGuid();
        }
        public string Body { get; set; }
        public Guid CorrelationId { get; private set; }
    }
}
