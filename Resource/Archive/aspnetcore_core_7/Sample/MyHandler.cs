using System.Threading.Tasks;
using NServiceBus;
#region InjectingDependency
public class MyHandler :
    IHandleMessages<MyMessage>
{
    MyService myService;

    public MyHandler(MyService myService)
    {
        this.myService = myService;
    }

    public Task Handle(MyMessage message, IMessageHandlerContext context)
    {
        myService.WriteHello();
        return Task.CompletedTask;
    }
}
#endregion
