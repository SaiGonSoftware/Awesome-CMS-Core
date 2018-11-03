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
            CreateMap<Post, PostViewModel>().ReverseMap();
			CreateMap<Post, PostListViewModel>().ReverseMap();
	        CreateMap<Post, PostIndexViewModel>().ReverseMap();
		}
    }
}
