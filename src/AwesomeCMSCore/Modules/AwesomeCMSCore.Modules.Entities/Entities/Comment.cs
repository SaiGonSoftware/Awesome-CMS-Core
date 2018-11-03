using AwesomeCMSCore.Modules.Entities.Enums;

namespace AwesomeCMSCore.Modules.Entities.Entities
{
	public class Comment : BaseEntity
	{
		public string Content { get; set; }
		public virtual Comment ParentComment { get; set; }
		public virtual Post Post { get; set; }
		public virtual User User { get; set; }
		public CommentStatus CommentStatus { get; set; }
	}
}
