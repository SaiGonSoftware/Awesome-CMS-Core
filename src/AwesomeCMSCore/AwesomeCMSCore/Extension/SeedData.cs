using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Entities.Data;
using AwesomeCMSCore.Modules.Entities.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace AwesomeCMSCore.Extension
{
    public static class SeedData
    {
        #region snippet_Initialize
        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new ApplicationDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
            {
                var tony = new User
                {
                    Id = Guid.NewGuid().ToString(),
                    Email = "ngohungphuc95@gmail.com",
                    NormalizedEmail = "ngohungphuc95@gmail.com".ToUpper(),
                    UserName = "tony",
                    NormalizedUserName = "tony".ToUpper(),
                    EmailConfirmed = true,
                    PhoneNumberConfirmed = true,
                    LockoutEnabled = false,
                    SecurityStamp = Guid.NewGuid().ToString()
                };

                var roles = new[]
                    {"Owner", "Administrator", "Editor"};

                foreach (var role in roles)
                {
                    var roleStore = new RoleStore<IdentityRole>(context);

                    if (!context.Roles.Any(r => r.Name == role))
                    {
                        await roleStore.CreateAsync(new IdentityRole
                        {
                            Name = role,
                            NormalizedName = role.ToUpper()
                        });
                    }
                }

                if (!context.Users.Any(u => u.UserName == tony.UserName))
                {
                    var password = new PasswordHasher<User>();
                    var hashed = password.HashPassword(tony, "123456");
                    tony.PasswordHash = hashed;
                    var userStore = new UserStore<User>(context);

                    await userStore.CreateAsync(tony);
                    await EnsureRole(serviceProvider, tony.Email, roles);
                    await context.SaveChangesAsync();
                }
            }
        }

        private static async Task EnsureRole(IServiceProvider serviceProvider, string email, string[] roles)
        {
            var userManager = serviceProvider.GetService<UserManager<User>>();

            var user = await userManager.FindByEmailAsync(email);

            await userManager.AddToRolesAsync(user, roles);
        }
        #endregion
    }
}
