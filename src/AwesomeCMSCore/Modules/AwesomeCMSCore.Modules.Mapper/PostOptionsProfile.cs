using AutoMapper;
using AwesomeCMSCore.Modules.Admin.ViewModels;
using AwesomeCMSCore.Modules.Entities.Entities;

namespace AwesomeCMSCore.Modules.Mapper
{
	public class PostOptionsProfile : Profile
	{
		public PostOptionsProfile()
		{
			CreateMap<PostOption, PostOptionsViewModel>(MemberList.None).ReverseMap();
		}
	}
}
