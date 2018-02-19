using AwesomeCMSCore.Infrastructure.Module;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using System.Collections.Generic;
using System.IO;
using AwesomeCMSCore.Modules.Entities.Data;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System;
using AwesomeCMSCore.Modules.Entities.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using React.AspNet;

namespace AwesomeCMSCore.Extension
{
    public static class ApplicationBuilderExtension
    {
        /// <summary>
        /// Serve static file base on module
        /// To access module static file simply use /ModuleName/path-to-file
        /// </summary>
        /// <param name="app"></param>
        /// <param name="modules"></param>
        /// <returns></returns>
        public static IApplicationBuilder ServeStaticModuleFile(this IApplicationBuilder app, IList<ModuleInfo> modules)
        {
            foreach (var module in modules)
            {
                var wwwrootDir = new DirectoryInfo(Path.Combine(module.Path, "wwwroot"));
                if (!wwwrootDir.Exists)
                {
                    continue;
                }

                app.UseStaticFiles(new StaticFileOptions()
                {
                    FileProvider = new PhysicalFileProvider(wwwrootDir.FullName),
                    RequestPath = new PathString("/" + module.ShortName)
                });
            }

            return app;
        }

        public static IApplicationBuilder SetupEnv(this IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            return app;
        }

        public static IApplicationBuilder UseCustomizeMvc(this IApplicationBuilder app)
        {
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            return app;
        }

        public static IApplicationBuilder InitializeDbTestData(this IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                scope.ServiceProvider.GetRequiredService<ApplicationDbContext>().Database.Migrate();
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();
               
                var tony = new User
                {
                    Email = "ngohungphuc95@gmail.com",
                    UserName = "tony",
                    NormalizedUserName = "TonyHudson",
                    EmailConfirmed = true,
                    PhoneNumberConfirmed = true,
                    LockoutEnabled = false,
                    SecurityStamp = Guid.NewGuid().ToString()
                };
                
                if (!userManager.Users.Any())
                {
                    userManager.CreateAsync(tony, "tony95!").Wait();
                }

            }

            return app;
        }

        public static IApplicationBuilder SetupReactJs(this IApplicationBuilder app)
        {
            app.UseReact(config =>
            {
                config
                  .AddScript("~/wwwroot/dist/login.js");

                // If you use an external build too (for example, Babel, Webpack,
                // Browserify or Gulp), you can improve performance by disabling
                // ReactJS.NET's version of Babel and loading the pre-transpiled
                // scripts. Example:
                //config
                //  .SetLoadBabel(false)
                //  .AddScriptWithoutTransform("~/Scripts/bundle.server.js");
            });

            return app;
        }
    }
}
