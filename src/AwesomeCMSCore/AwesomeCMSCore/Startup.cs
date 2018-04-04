using AutoMapper;
using AwesomeCMSCore.Extension;
using AwesomeCMSCore.Infrastructure.Config;
using AwesomeCMSCore.Infrastructure.Module.Views;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

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
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.LoadInstalledModules(_hostingEnvironment.ContentRootPath);
            services.InjectAppConfig(_configuration);
            services.AddCustomizedDataStore(_configuration);
            services.AddCustomAuthentication();
            services.InjectApplicationServices();
            services.AddAutoMapper();
            //ModuleViewLocationExpander is used to help the view engine lookup up the right module folder the views
            services.Configure<RazorViewEngineOptions>(options => { options.ViewLocationExpanders.Add(new ModuleViewLocationExpander()); });
            services.AddCustomizedMvc(GlobalConfiguration.Modules, _configuration, _hostingEnvironment);
            services.RegisterGzip();
            services.RegisterBus(_configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseResponseCompression();
            app.UseStaticFiles();
            app.SetupEnv(env);
            app.ServeStaticModuleFile(GlobalConfiguration.Modules);
            app.UseAuthentication();
            app.UseCustomizeMvc();
        }
    }
}
