using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AwesomeCMSCore.Modules.Shared.Models
{
	public class EmailRegisterModel
	{
		[Required]
		[EmailAddress]
		public string Email { get; set; }
	}
}
