using System;
using System.Collections.Generic;
using System.Text;

namespace AwesomeCMSCore.Modules.Entities.Entities
{
    public class PasswordRequest: BaseEntity
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public bool IsActive { get; set; }
    }
}
