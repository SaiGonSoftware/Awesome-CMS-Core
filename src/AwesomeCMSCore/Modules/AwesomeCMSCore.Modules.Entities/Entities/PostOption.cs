using AwesomeCMSCore.Modules.Entities.Enums;

namespace AwesomeCMSCore.Modules.Entities.Entities
{
	public class PostOption : BaseEntity
	{
		public virtual User User { get; set; }
		public string Key { get; set; }
		public string Value { get; set; }
		public PostOptionType OptionType { get; set; }
		public virtual Post Post { get; set; }
	}
}
