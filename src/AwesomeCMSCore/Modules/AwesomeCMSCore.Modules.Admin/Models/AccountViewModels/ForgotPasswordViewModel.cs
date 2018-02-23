using System.ComponentModel.DataAnnotations;

namespace AwesomeCMSCore.Modules.Admin.Models.AccountViewModels
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
