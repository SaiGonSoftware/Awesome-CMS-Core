using Microsoft.AspNetCore.Mvc;

namespace AwesomeCMSCore.Modules.Helper.Extensions
{
	public class UrlHelperExtension : IUrlHelperExtension
	{
		private readonly IUrlHelper _urlHelper;
		public UrlHelperExtension(IUrlHelper urlHelper)
		{
			_urlHelper = urlHelper;
		}

		public string EmailConfirmationLink(string userId, string code, string scheme)
		{
			return _urlHelper.Action(
				action: "ConfirmEmail",
				controller: "Account",
				values: new { userId, code },
				protocol: scheme);
		}

		public string ResetPasswordCallbackLink(string email, string token, string scheme)
		{
			return _urlHelper.Action(
				action: "RequestResetPassword",
				controller: "Account",
				values: new { email, token },
				protocol: scheme);
		}
	}
}
