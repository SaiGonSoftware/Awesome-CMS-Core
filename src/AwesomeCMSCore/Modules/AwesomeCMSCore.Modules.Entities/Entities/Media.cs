using AwesomeCMSCore.Modules.Entities.Enums;

namespace AwesomeCMSCore.Modules.Entities.Entities
{
	public class Media : BaseEntity
	{
		public string Name { get; set; }
		public string Path { get; set; }
		public long Size { get; set; }
		public string Type { get; set; }
		public bool IsDeleted { get; set; }
		public int PostId { get; set; }
		public StorageType StorageType { get; set; }
		public virtual Post Post { get; set; }
		public virtual User User { get; set; }
	}
}
