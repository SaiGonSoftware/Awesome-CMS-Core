using AutoMapper;
using AwesomeCMSCore.Extension;
using AwesomeCMSCore.Hubs;
using AwesomeCMSCore.Infrastructure.Config;
using AwesomeCMSCore.Infrastructure.Module.Views;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NLog.Extensions.Logging;
using NLog.Web;

namespace AwesomeCMSCore
{
	public class Startup
	{
		private readonly IHostingEnvironment _hostingEnvironment;
		private readonly IConfiguration _configuration;

		public Startup(
			IConfiguration configuration,
			IHostingEnvironment hostingEnvironment)
		{
			_configuration = configuration;
			_hostingEnvironment = hostingEnvironment;

			var builder = new ConfigurationBuilder();

			if (_hostingEnvironment.IsDevelopment())
			{
				builder.AddUserSecrets<Startup>();
			}
			else
			{
				builder
					.SetBasePath(hostingEnvironment.ContentRootPath)
					.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
					.AddJsonFile($"appsettings.{hostingEnvironment.EnvironmentName}.json", optional: true)
					.AddEnvironmentVariables();
			}

			_configuration = builder.Build();
			hostingEnvironment.ConfigureNLog("nlog.config");
		}

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.LoadInstalledModules(_hostingEnvironment.ContentRootPath);
			services.InjectAppConfig(_configuration);
			services.AddCustomizedDataStore(_configuration);
			services.AddCustomAuthentication(_configuration);
			services.InjectApplicationServices();
			services.RegisterBackgroundService(_configuration);
			services.AddAutoMapper(config => config.ValidateInlineMaps = false);
			//ModuleViewLocationExpander is used to help the view engine lookup up the right module folder the views
			services.Configure<RazorViewEngineOptions>(options => { options.ViewLocationExpanders.Add(new ModuleViewLocationExpander()); });
			services.AddCustomizedMvc(GlobalConfiguration.Modules, _configuration, _hostingEnvironment);
			services.ConfigApiVersioning();
			services.IntegrateSwagger();
			services.RegisterGzip();
			//services.IntegrateRedis(_configuration);
			services.AddSignalR();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			app.UseResponseCompression();
			app.UseStaticFiles();
			app.SetupEnv(env);
			app.ConfigSwagger();
			app.ServeStaticModuleFile(GlobalConfiguration.Modules);
			app.UseAuthentication();
			app.UseSignalR(routes =>
			{
				routes.MapHub<CmsCoreHub>("/cmscore");
			});
			app.UseCustomizeMvc();
		}
	}
}
