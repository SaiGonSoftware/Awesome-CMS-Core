using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NServiceBus;

[Route("api/[controller]")]
public class SendMessageController :
    Controller
{
    IMessageSession messageSession;

    #region MessageSessionInjection
    public SendMessageController(IMessageSession messageSession)
    {
        this.messageSession = messageSession;
    }
    #endregion


    #region MessageSessionUsage
    [HttpGet]
    public async Task<string> Get()
    {
        var message = new MyMessage();
        await messageSession.Send(message)
            .ConfigureAwait(false);
        return "Message sent to endpoint";
    }
    #endregion
}
