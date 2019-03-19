namespace AwesomeCMSCore.Modules.GoogleDriveAPI
{
	public interface IGoogleDriveAPI
	{
		string UploadFIle(string path);
		void DownloadFile(string blobId, string savePath);
	}
}
