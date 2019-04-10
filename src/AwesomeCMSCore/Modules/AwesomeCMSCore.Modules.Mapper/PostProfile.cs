using AutoMapper;
using AwesomeCMSCore.Modules.Admin.ViewModels;
using AwesomeCMSCore.Modules.Client.ViewModels;
using AwesomeCMSCore.Modules.Entities.Entities;

namespace AwesomeCMSCore.Modules.Mapper
{
	public class PostProfile : Profile
	{
		public PostProfile()
		{
			CreateMap<Post, PostViewModel>(MemberList.None).ReverseMap();
			CreateMap<Post, PostListViewModel>(MemberList.None).ReverseMap();
			CreateMap<Post, PostIndexViewModel>(MemberList.None).ReverseMap();
		}
	}
}
