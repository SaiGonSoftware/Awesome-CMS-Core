using System;
using System.Collections.Generic;
using AwesomeCMSCore.Modules.Entities.Enums;

namespace AwesomeCMSCore.Modules.Admin.ViewModels
{
    public class PostListViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string Content { get; set; }
        public PostStatus PostStatus { get; set; }
        public DateTime DateCreated { get; set; }
    }

    public class PostDefaultViewModel
    {
        public IEnumerable<PostListViewModel> PostsPublished { get; set; }
        public IEnumerable<PostListViewModel> PostsDrafted { get; set; }
        public IEnumerable<PostListViewModel> Postseleted { get; set; }
        public int NumberOfPostPublished { get; set; }
        public int NumberOfDraftedPost { get; set; }
        public int NumberOfDeletedPost { get; set; }
    }
}
