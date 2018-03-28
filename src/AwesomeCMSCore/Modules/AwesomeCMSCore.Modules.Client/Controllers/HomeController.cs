using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RabbitMQ.Client;

namespace AwesomeCMSCore.Modules.Client.Controllers
{
    public class HomeController : Controller
    {

        public async Task<IActionResult> Index()
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.QueueDeclare(queue: "hello",
                    durable: false,
                    exclusive: false,
                    autoDelete: false,
                    arguments: null);

                string message = "Hello World!";
                var body = Encoding.UTF8.GetBytes(message);

                channel.BasicPublish(exchange: "",
                    routingKey: "hello",
                    basicProperties: null,
                    body: body);
            }

            return View();
        }
    }
}
