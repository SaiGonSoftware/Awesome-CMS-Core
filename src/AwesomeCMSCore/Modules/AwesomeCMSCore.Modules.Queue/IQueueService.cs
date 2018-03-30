using System;
using System.Collections.Generic;
using System.Text;

namespace AwesomeCMSCore.Modules.Queue
{
    public interface IQueueService
    {
        void PublishMessage(string queueName, string message, string routingKey, string exchangeType);
    }
}
