using System.ComponentModel.DataAnnotations;

namespace AwesomeCMSCore.Modules.Account.ViewModels
{
    public class ResetPasswordViewModel
    {
        [Required]
        public string Password { get; set; }
    }
}
