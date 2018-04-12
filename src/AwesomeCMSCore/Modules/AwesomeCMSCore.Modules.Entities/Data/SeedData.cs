using System;
using System.Linq;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Entities.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace AwesomeCMSCore.Modules.Entities.Data
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
                    Id = new Guid("c3e40e7f-aca2-4f55-ae88-44a44f64dd12").ToString(),
                    Email = "ngohungphuc95@gmail.com",
                    NormalizedEmail = "ngohungphuc95@gmail.com".ToUpper(),
                    UserName = "tony",
                    NormalizedUserName = "tony".ToUpper(),
                    EmailConfirmed = true,
                    PhoneNumberConfirmed = true,
                    LockoutEnabled = false,
                    SecurityStamp = Guid.NewGuid().ToString()
                };

                var tony1 = new User
                {
                    Id = new Guid("8dd1feb6-8068-4593-83b8-291f523483dc").ToString(),
                    Email = "ngohungphuc1@gmail.com",
                    NormalizedEmail = "ngohungphuc1@gmail.com".ToUpper(),
                    UserName = "tony1",
                    NormalizedUserName = "tony1".ToUpper(),
                    EmailConfirmed = true,
                    PhoneNumberConfirmed = true,
                    LockoutEnabled = false,
                    SecurityStamp = Guid.NewGuid().ToString()
                };

                var tony2 = new User
                {
                    Id = new Guid("68627c5a-5788-4820-bd9d-0034d3f0239b").ToString(),
                    Email = "ngohungphuc2@gmail.com",
                    NormalizedEmail = "ngohungphuc2@gmail.com".ToUpper(),
                    UserName = "tony2",
                    NormalizedUserName = "tony2".ToUpper(),
                    EmailConfirmed = true,
                    PhoneNumberConfirmed = true,
                    LockoutEnabled = false,
                    SecurityStamp = Guid.NewGuid().ToString()
                };

                var tony3 = new User
                {
                    Id = new Guid("92bf0744-98e0-4ae7-b1de-0cddf5327989").ToString(),
                    Email = "ngohungphuc3@gmail.com",
                    NormalizedEmail = "ngohungphuc3@gmail.com".ToUpper(),
                    UserName = "tony3",
                    NormalizedUserName = "tony3".ToUpper(),
                    EmailConfirmed = true,
                    PhoneNumberConfirmed = true,
                    LockoutEnabled = false,
                    SecurityStamp = Guid.NewGuid().ToString()
                };

                var tony4 = new User
                {
                    Id = new Guid("4d272cc9-c2ff-42eb-8afc-5509353fdf42").ToString(),
                    Email = "ngohungphuc4@gmail.com",
                    NormalizedEmail = "ngohungphuc4@gmail.com".ToUpper(),
                    UserName = "tony4",
                    NormalizedUserName = "tony4".ToUpper(),
                    EmailConfirmed = true,
                    PhoneNumberConfirmed = true,
                    LockoutEnabled = false,
                    SecurityStamp = Guid.NewGuid().ToString()
                };

                var tony5 = new User
                {
                    Id = new Guid("a1add451-7dd2-46fd-9877-1996e3f1fb4c").ToString(),
                    Email = "ngohungphuc5@gmail.com",
                    NormalizedEmail = "ngohungphuc5@gmail.com".ToUpper(),
                    UserName = "tony5",
                    NormalizedUserName = "tony5".ToUpper(),
                    EmailConfirmed = true,
                    PhoneNumberConfirmed = true,
                    LockoutEnabled = false,
                    SecurityStamp = Guid.NewGuid().ToString()
                };

                var roles = new[]
                    {"Owner", "Administrator", "Editor"};

                var roles1 = new[]
                    {"Administrator"};

                var roles2 = new[]
                    {"Editor"};

                foreach (var role in roles)
                {
                    var roleStore = new RoleStore<ApplicationRole>(context);

                    if (!context.Roles.Any(r => r.Name == role))
                    {
                        await roleStore.CreateAsync(new ApplicationRole
                        {
                            Name = role,
                            NormalizedName = role.ToUpper()
                        });
                    }
                }

                if (!context.Users.Any(u => u.UserName == tony.UserName))
                {
                    await SeedUser(tony, context, serviceProvider, roles);
                    await SeedUser(tony1, context, serviceProvider, roles1);
                    await SeedUser(tony2, context, serviceProvider, roles2);
                    await SeedUser(tony3, context, serviceProvider, roles2);
                    await SeedUser(tony4, context, serviceProvider, roles2);
                    await SeedUser(tony5, context, serviceProvider, roles2);
                }
            }
        }

        private static async Task EnsureRole(IServiceProvider serviceProvider, string email, string[] roles)
        {
            var userManager = serviceProvider.GetService<UserManager<User>>();

            var user = await userManager.FindByEmailAsync(email);

            await userManager.AddToRolesAsync(user, roles);
        }

        private static async Task SeedUser(User user, ApplicationDbContext context, IServiceProvider serviceProvider, string[] roles)
        {
            var password = new PasswordHasher<User>();
            var hashed = password.HashPassword(user, "123456");
            user.PasswordHash = hashed;
            var userStore = new UserStore<User>(context);

            await userStore.CreateAsync(user);
            await EnsureRole(serviceProvider, user.Email, roles);
            await context.SaveChangesAsync();
        }
        #endregion
    }
}
