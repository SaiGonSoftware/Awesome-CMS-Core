using AutoMapper;
using AwesomeCMSCore.Modules.Admin.ViewModels;
using AwesomeCMSCore.Modules.Entities.Entities;

namespace AwesomeCMSCore.Modules.Mapper
{
    public class TagProfile : Profile
    {
        public TagProfile()
        {
            CreateMap<Tag, TagViewModel>().ReverseMap();
        }
    }
}
