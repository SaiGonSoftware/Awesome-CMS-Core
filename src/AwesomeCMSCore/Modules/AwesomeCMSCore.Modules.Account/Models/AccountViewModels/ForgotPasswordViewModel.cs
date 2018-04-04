using System.ComponentModel.DataAnnotations;

namespace AwesomeCMSCore.Modules.Account.Models.AccountViewModels
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
