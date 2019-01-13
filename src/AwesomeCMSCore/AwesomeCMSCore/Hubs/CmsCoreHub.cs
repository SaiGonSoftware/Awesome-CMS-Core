using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AwesomeCMSCore.Hubs
{
	public class CmsCoreHub : Hub
	{
		public async Task NotifyImageProcessCompleted(string user, string message)
		{
			await Clients.All.SendAsync("NotifyImageProcessCompleted", user, message);
		}
	}
}
