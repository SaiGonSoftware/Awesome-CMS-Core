using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using AwesomeCMSCore.Modules.Admin.Models;
using AwesomeCMSCore.Modules.Entities.Entities;

namespace AwesomeCMSCore.Modules.Mapper
{
    public class PostProfile : Profile
    {
        public PostProfile()
        {
            CreateMap<Post, PostViewModel>().ReverseMap();
            CreateMap<Post, PostListViewModel>().ReverseMap();
        }
    }
}
