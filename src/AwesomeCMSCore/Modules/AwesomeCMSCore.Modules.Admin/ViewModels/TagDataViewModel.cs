using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AwesomeCMSCore.Modules.Admin.ViewModels
{
    public class TagDataViewModel
    {
        [Required]
        public string TagData { get; set; }
        [Required]
        public string TagOptions { get; set; }
    }
}
