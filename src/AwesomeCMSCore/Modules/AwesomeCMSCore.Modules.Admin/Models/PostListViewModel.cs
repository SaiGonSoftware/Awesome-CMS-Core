using System;
using System.Collections.Generic;
using System.Text;

namespace AwesomeCMSCore.Modules.Admin.Models
{
    public class PostListViewModel
    {
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string Content { get; set; }
        public bool IsDeleted { get; set; }
    }
}
