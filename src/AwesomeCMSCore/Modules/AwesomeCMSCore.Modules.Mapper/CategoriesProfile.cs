using AutoMapper;
using AwesomeCMSCore.Modules.Admin.ViewModels;
using AwesomeCMSCore.Modules.Entities.Entities;

namespace AwesomeCMSCore.Modules.Mapper
{
    public class CategoriesProfile : Profile
    {
        public CategoriesProfile()
        {
            CreateMap<Categories, CategoriesViewModel>().ReverseMap();
        }
    }
}
