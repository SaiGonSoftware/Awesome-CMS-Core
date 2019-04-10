using System;
using System.Globalization;
using System.Linq;
using AwesomeCMSCore.Modules.Helper.Enum;

namespace AwesomeCMSCore.Modules.Helper.Extensions
{
	public static class RandomString
	{
		private static readonly Random Random = new Random();

		public static string GenerateRandomString(int length)
		{
			const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
			return new string(Enumerable.Repeat(chars.ToLower(CultureInfo.InvariantCulture), length)
				.Select(s => s[Random.Next(s.Length)]).ToArray());
		}
	}
}
