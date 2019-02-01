using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Helper.Extensions;
using AwesomeCMSCore.Modules.Shared.Settings;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace AwesomeCMSCore.Modules.Admin.Services
{
	public class AssetService : IAssetService
	{
		private readonly IOptions<AssetSettings> _assetSettings;
		public AssetService(IOptions<AssetSettings> assetSettings)
		{
			_assetSettings = assetSettings;
		}

		public async Task<string> UploadAssets(IFormFile file, string fileName)
		{
			try
			{
				var path = Path.Combine(Directory.GetCurrentDirectory(), _assetSettings.Value.StorePath, fileName);
				using (var stream = new FileStream(path, FileMode.Create))
				{
					await file.CopyToAsync(stream);
				}
				return path;
			}
			catch (Exception)
			{
				throw;
			}
		}
	}
}
