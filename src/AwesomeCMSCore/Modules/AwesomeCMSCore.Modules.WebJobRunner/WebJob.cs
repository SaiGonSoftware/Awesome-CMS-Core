using System;
using System.IO;
using System.Text;
using AwesomeCMSCore.Modules.Helper.Extensions;
using AwesomeCMSCore.Modules.Queue.Settings;
using AwesomeCMSCore.Modules.Shared.Settings;
using AwesomeCMSCore.Modules.WebJob.Settings;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;

namespace AwesomeCMSCore.Modules.WebJobRunner
{
	public class WebJob
	{
		private readonly IOptions<WebJobSettings> _webJobSettings;
		private readonly IOptions<QueueSettings> _queueSettings;
		private readonly IOptions<AssetSettings> _assetSettings;

		public WebJob(
			IOptions<WebJobSettings> webJobSettings,
			IOptions<QueueSettings> queueSettings,
			IOptions<AssetSettings> assetSettings)
		{
			_webJobSettings = webJobSettings;
			_queueSettings = queueSettings;
			_assetSettings = assetSettings;
		}

		public void RunImageProcessQueue()
		{
			var factory = new ConnectionFactory()
			{
				HostName = _queueSettings.Value.Host,
				UserName = _queueSettings.Value.Username,
				Password = _queueSettings.Value.Password
			};

			using (var connection = factory.CreateConnection())
			using (var channel = connection.CreateModel())
			{
				channel.QueueDeclare(queue: QueueName.ImageResizeProcessing.ToString(),
					durable: true,
					exclusive: false,
					autoDelete: false,
					arguments: null);

				//Fair dispatch setup
				channel.BasicQos(prefetchSize: 0, prefetchCount: 1, global: false);
				Console.WriteLine(" [*] Waiting for messages.");

				var consumer = new EventingBasicConsumer(channel);
				consumer.Received += (model, ea) =>
				{
					var body = ea.Body;
					var filePath = Encoding.UTF8.GetString(body);
					Console.WriteLine(" [x] Received {0}", filePath);

					var fileInfo = new FileInfo(filePath);

					using (var image = Image.Load(filePath))
					{
						image.Mutate(x => x
							 .Resize(295, 205));

						image.Save(Path.Combine(_assetSettings.Value.AssetPath, fileInfo.Name));
					}

					channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);
				};

				channel.BasicConsume(queue: QueueName.ImageResizeProcessing.ToString(),
					autoAck: false,
					consumer: consumer);

				Console.WriteLine(" Press [enter] to exit.");
				Console.ReadLine();
			}
		}
	}
}
