using AwesomeCMSCore.Modules.Entities.Entities;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Text;

namespace AwesomeCMSCore.Modules.Account.ViewModels
{
    public class GroupViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<string> Roles { get; set; }
    }
}
