using AwesomeCMSCore.Infrastructure.Module;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.FileProviders;
using System.Collections.Generic;
using System.IO;
using Exceptionless;

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

				app.UseStaticFiles(new StaticFileOptions
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
			}
			else
			{
				app.UseExceptionless("NvjyUM7jZdHylprZ5oAPxEpBmvgZXnYZxVyUf5y5");
				app.UseHsts();
			}

			app.UseHttpsRedirection();
			app.UseCookiePolicy();
			#region Custom Middleware
			app.UseExceptionHandler("/Error/500");
			app.Use(async (context, next) =>
			{
				await next();
				if (context.Response.StatusCode == 404)
				{
					context.Request.Path = "/Error/404";
					await next();
				}
			});
			//Turn on if we want to store data in folder and block user from access it 
			//app.UseProtectFolder(new ProtectFolderOptions
			//{
			//    Path = "/frontend"
			//});
			#endregion

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

		public static IApplicationBuilder ConfigSwagger(this IApplicationBuilder app)
		{
			// Enable middleware to serve generated Swagger as a JSON endpoint.
			app.UseSwagger();

			// Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), specifying the Swagger JSON endpoint.
			app.UseSwaggerUI(c =>
			{
				c.SwaggerEndpoint($"/swagger/v1/swagger.json", "Awesome CMS Core API V1");
				c.SwaggerEndpoint($"/swagger/v2/swagger.json", "Awesome CMS Core API V2");
			});

			return app;
		}
	}
}
