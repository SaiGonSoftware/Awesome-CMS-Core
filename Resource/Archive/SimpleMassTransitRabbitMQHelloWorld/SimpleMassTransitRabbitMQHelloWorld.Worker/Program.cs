using System;
using System.Linq;
using MassTransit;
using SimpleMassTransitRabbitMQHelloWorld.Messages;

namespace SimpleMassTransitRabbitMQHelloWorld.Worker
{
    class Program
    {
        static void Main(string[] args)
        {
            Bus.Initialize(cfg =>
            {
                cfg.UseRabbitMq();
                cfg.ReceiveFrom("rabbitmq://localhost/nodogmablog_queue_worker");

                cfg.Subscribe(subs => subs.Consumer<SimpleMessageConsumer>().Permanent());
                
                //***** Below are other ways add consumers and hanlders *****\\
                //***** I include them for reference *****\\

                /************************************************************************
                
                sbc.Subscribe(subs => subs.Consumer<ComplextMessageConsumer>().Permanent());
 
                sbc.Subscribe(subs => subs.Handler<SimpleMessage>(((context, msg) =>
                {
                    Console.WriteLine(msg.Body + " header count " + context.Headers.Count());
                })));

                sbc.Subscribe(subs => subs.Handler<SimpleMessage>(SimpleMessageHandler.Handle));

                var headerAndMessageHandler = new Action<IConsumeContext<SimpleMessage>, SimpleMessage>((context, msg) =>
                {
                    Console.WriteLine(context.Headers.FirstOrDefault());
                    Console.WriteLine(msg.Body);
                });

                sbc.Subscribe(subs =>
                    subs.Handler<SimpleMessage>(headerAndMessageHandler));

                sbc.Subscribe(subs =>
                    subs.Handler<SimpleMessage>((context, msg) =>
                    {
                        Console.WriteLine(context.Headers.FirstOrDefault());
                        Console.WriteLine(msg.Body);
                    }));

                sbc.Subscribe(subs =>
                    subs.Handler<SimpleMessage>(msg =>
                    {
                        Console.WriteLine(msg.Body);
                    }
                ));

                sbc.Subscribe(subs =>
                {
                    var handler = new Action<IConsumeContext<SimpleMessage>, SimpleMessage>((context, msg) =>
                    {
                        Console.WriteLine(context.Headers.FirstOrDefault());
                        Console.WriteLine(msg.Body);
                    });
                    subs.Handler(handler);
                });
                ************************************************************************/
            });

            /***************** Alternate way of setting up the bus ******************
            IServiceBus bus = ServiceBusFactory.New(cfg =>
            {
                cfg.UseRabbitMq();
                cfg.ReceiveFrom("rabbitmq://localhost/nodogmablog_queue_worker");
            });
            bus.SubscribeConsumer<SimpleMessageConsumer>();
            ************************************************************************/
        }
    }
}