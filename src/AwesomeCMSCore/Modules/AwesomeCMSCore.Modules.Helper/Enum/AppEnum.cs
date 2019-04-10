namespace AwesomeCMSCore.Modules.Helper.Enum
{
	public static class AppEnum
	{
		public static readonly int MaxFailedAccessAttempts = 2;
		public static readonly int MinPasswordChar = 8;
		public static readonly int MinGeneratedAssetName = 8;
	}

	public static class UserClaimsKey
	{
		public static readonly string Sub = "sub";

		public static readonly string Name = "name";

		public static readonly string Role = "role";
	}
}
