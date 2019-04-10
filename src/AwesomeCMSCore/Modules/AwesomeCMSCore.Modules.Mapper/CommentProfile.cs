using AutoMapper;
using AwesomeCMSCore.Modules.Admin.ViewModels;
using AwesomeCMSCore.Modules.Entities.Entities;

namespace AwesomeCMSCore.Modules.Mapper
{
	public class CommentProfile : Profile
	{
		public CommentProfile()
		{
			CreateMap<Comment, CommentDto>(MemberList.None).ReverseMap();
		}
	}
}
