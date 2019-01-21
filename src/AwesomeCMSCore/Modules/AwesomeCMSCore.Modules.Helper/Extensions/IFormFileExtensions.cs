using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace AwesomeCMSCore.Modules.Helper.Extensions
{
	public static class IFormFileExtensions
	{
		public static string GetFilename(this IFormFile file)
		{
			return ContentDispositionHeaderValue.Parse(
							file.ContentDisposition).FileName.ToString().Trim('"');
		}

		public static async Task<MemoryStream> GetFileStream(this IFormFile file)
		{
			MemoryStream filestream = new MemoryStream();
			await file.CopyToAsync(filestream);
			return filestream;
		}

		public static async Task<byte[]> GetFileArray(this IFormFile file)
		{
			MemoryStream filestream = new MemoryStream();
			await file.CopyToAsync(filestream);
			return filestream.ToArray();
		}
	}
}
