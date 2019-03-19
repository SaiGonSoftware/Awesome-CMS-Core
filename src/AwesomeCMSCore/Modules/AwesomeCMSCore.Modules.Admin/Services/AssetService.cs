using System;
using System.IO;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.GoogleDriveAPI;
using AwesomeCMSCore.Modules.Queue.Services;
using AwesomeCMSCore.Modules.Shared.Settings;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;

namespace AwesomeCMSCore.Modules.Admin.Services
{
	public class AssetService : IAssetService
	{
		private readonly IOptions<AssetSettings> _assetSettings;
		private readonly IQueueService _queueService;
		private readonly IGoogleDriveAPI _googleDriveAPI;
		public AssetService(
			IOptions<AssetSettings> assetSettings,
			IQueueService queueService,
			IGoogleDriveAPI googleDriveAPI)
		{
			_assetSettings = assetSettings;
			_queueService = queueService;
			_googleDriveAPI = googleDriveAPI;
		}

		public async Task<string> UploadAssets(IFormFile file, string fileName)
		{
			string storePath = "";
			try
			{
				storePath = Path.Combine(_assetSettings.Value.StorePath, $"{fileName}.{file.ContentType.Split("/")[1]}");
				using (var stream = new FileStream(storePath, FileMode.Create))
				{
					await file.CopyToAsync(stream);
				}

				using (var image = Image.Load(storePath))
				{
					image.Mutate(x => x
						 .Resize(295, 205));

					var uploadFile = Path.Combine(_assetSettings.Value.AssetPath, $"{fileName}.{file.ContentType.Split("/")[1]}");
					image.Save(uploadFile);

					var blobId = _googleDriveAPI.UploadFIle(uploadFile);
					var drivePath = $"{_assetSettings.Value.GoogleDriveStorePath}{blobId}";
					return drivePath;
				}
			}
			catch (Exception ex)
			{
				throw ex;
			}
			finally
			{
				File.Delete(storePath);
			}
		}
	}
}
