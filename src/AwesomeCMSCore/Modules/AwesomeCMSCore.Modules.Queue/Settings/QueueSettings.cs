namespace AwesomeCMSCore.Modules.Queue.Settings
{
	public class QueueSettings
	{
		public string Host { get; set; }
		public string Username { get; set; }
		public string Password { get; set; }
	}

	public enum QueueName
	{
		ImageResizeProcessing
	}

	public class QueueOptions
	{
		public string QueueName { get; set; }
		public string Message { get; set; }
		public bool IsObject { get; set; }
		public string RoutingKey { get; set; }
		public string ExchangeType { get; set; } = "";
	}
}