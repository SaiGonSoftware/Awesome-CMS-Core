using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AwesomeCMSCore.Modules.Admin.Services
{
	public interface IAssetService
	{
		Task<string> UploadAssets(IFormFile file, string fileName);
	}
}
