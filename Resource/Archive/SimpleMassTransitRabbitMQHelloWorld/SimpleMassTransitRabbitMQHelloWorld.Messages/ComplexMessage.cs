using System;
using MassTransit;

namespace SimpleMassTransitRabbitMQHelloWorld.Messages
{
    public class ComplexMessage : CorrelatedBy<Guid>
    {
        public ComplexMessage()
        {
            CorrelationId = Guid.NewGuid();
        }
        public string ComplexBody { get; set; }
        public Guid CorrelationId { get; private set; }
    }
}
