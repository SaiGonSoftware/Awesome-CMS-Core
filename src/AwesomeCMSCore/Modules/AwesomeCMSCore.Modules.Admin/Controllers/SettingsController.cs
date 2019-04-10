using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AwesomeCMSCore.Modules.Admin.Controllers
{
	[Authorize]
	public class SettingsController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
	}
}
