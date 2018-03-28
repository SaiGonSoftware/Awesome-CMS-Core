using System;
using System.Threading.Tasks;
using NServiceBus;

static class Program
{
    static async Task Main()
    {
        Console.Title = "Samples.ASPNETCore.Endpoint";
        var endpointConfiguration = new EndpointConfiguration("Samples.ASPNETCore.Endpoint");
        endpointConfiguration.UsePersistence<LearningPersistence>();
        endpointConfiguration.UseTransport<LearningTransport>();

        var endpointInstance = await Endpoint.Start(endpointConfiguration)
            .ConfigureAwait(false);
        Console.WriteLine("Press any key to exit");
        Console.ReadKey();
        await endpointInstance.Stop()
            .ConfigureAwait(false);
    }
}