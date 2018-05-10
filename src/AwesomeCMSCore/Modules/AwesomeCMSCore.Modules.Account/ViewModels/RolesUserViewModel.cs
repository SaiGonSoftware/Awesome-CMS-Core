using System.Collections.Generic;

namespace AwesomeCMSCore.Modules.Account.ViewModels
{
    public class RolesUserViewModel
    {
        public IEnumerable<UserRoleViewModel> RoleList { get; set; }
        public IList<string> CurrentUserRoles { get; set; }
    }
}
