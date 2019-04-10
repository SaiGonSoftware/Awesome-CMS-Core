using AutoMapper;
using AwesomeCMSCore.Modules.Account.ViewModels;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Entities.ViewModel;

namespace AwesomeCMSCore.Modules.Mapper
{
	public class UserProfile : Profile
	{
		public UserProfile()
		{
			CreateMap<User, AccountViewModel>(MemberList.None).ReverseMap();
			CreateMap<User, UserViewModel>(MemberList.None).ReverseMap();
		}
	}
}
