using System;
using System.Collections.Generic;
using System.Text;
using AwesomeCMSCore.Modules.Entities.Entities;

namespace AwesomeCMSCore.Modules.Admin.ViewModels
{
    public class PostOptionsViewModel
    {
        public string Key { get; set; }
        public string Value { get; set; }
        public string OptionType { get; set; }
        public Post Post { get; set; }
    }
}
