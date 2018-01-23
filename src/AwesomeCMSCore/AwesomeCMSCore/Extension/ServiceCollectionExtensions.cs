using Autofac;
using Autofac.Extensions.DependencyInjection;
using AwesomeCMSCore.Infrastructure.Config;
using AwesomeCMSCore.Infrastructure.Module;
using AwesomeCMSCore.Modules.Entities.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Razor.Compilation;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.Loader;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyModel;
using Microsoft.Extensions.DependencyModel.Resolution;
using Microsoft.DotNet.PlatformAbstractions;

namespace AwesomeCMSCore.Extension
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection LoadInstalledModules(this IServiceCollection services, string contentRootPath)
        {
            var modules = new List<ModuleInfo>();
            var moduleRootFolder = new DirectoryInfo(Path.Combine(contentRootPath, "Modules"));
            var moduleFolders = moduleRootFolder.GetDirectories();

            foreach (var moduleFolder in moduleFolders)
            {
                var binFolder = new DirectoryInfo(Path.Combine(moduleFolder.FullName, "bin"));
                if (!binFolder.Exists)
                {
                    continue;
                }

                foreach (var file in binFolder.GetFileSystemInfos("*.dll", SearchOption.AllDirectories))
                {
                    Assembly assembly;
                    try
                    {
                        assembly = AssemblyLoadContext.Default.LoadFromAssemblyPath(file.FullName);
                    }
                    catch (FileLoadException)
                    {
                        // Get loaded assembly
                        assembly = Assembly.Load(new AssemblyName(Path.GetFileNameWithoutExtension(file.Name)));
                        if (assembly == null)
                        {
                            throw;
                        }
                    }

                    //add to globalconfiguration module
                    if (assembly.FullName.Contains(moduleFolder.Name))
                    {
                        modules.Add(new ModuleInfo
                        {
                            Name = moduleFolder.Name,
                            Assembly = assembly,
                            Path = moduleFolder.FullName
                        });
                    }
                }
            }

            GlobalConfiguration.Modules = modules;
            return services;
        }

        public static IServiceCollection AddCustomizedMvc(this IServiceCollection services, IList<ModuleInfo> modules, IConfiguration configuration, IHostingEnvironment hostingEnvironment)
        {
            var mvcBuilder = services
                .AddMvc()
                // fix assembly ref for web api
                //.ConfigureApplicationPartManager(manager =>
                //{
                //    manager.FeatureProviders.Remove(manager.FeatureProviders.First(f => f is MetadataReferenceFeatureProvider));
                //    manager.FeatureProviders.Add(new ReferencesMetadataReferenceFeatureProvider());
                //})
                .AddRazorOptions(o =>
                {
                    foreach (var module in modules)
                    {
                        o.AdditionalCompilationReferences.Add(MetadataReference.CreateFromFile(module.Assembly.Location));
                    }
                });

            var moduleInitializerInterface = typeof(IModuleInitializer);
            foreach (var module in modules)
            {
                // Register controller from modules to main web host
                mvcBuilder.AddApplicationPart(module.Assembly);

                // Register dependency in modules
                var moduleInitializerType =
                    module.Assembly.GetTypes().FirstOrDefault(x => typeof(IModuleInitializer).IsAssignableFrom(x));
                if ((moduleInitializerType != null) && (moduleInitializerType != typeof(IModuleInitializer)))
                {
                    var moduleInitializer = (IModuleInitializer)Activator.CreateInstance(moduleInitializerType);
                    moduleInitializer.Init(services);
                }
            }

            var builder = new ContainerBuilder();
            foreach (var module in GlobalConfiguration.Modules)
            {
                builder.RegisterAssemblyTypes(module.Assembly).AsImplementedInterfaces();
            }

            builder.RegisterInstance(configuration);
            builder.RegisterInstance(hostingEnvironment);
            builder.Populate(services);

            var container = builder.Build();
            container.Resolve<IServiceProvider>();

            return services;
        }

        public static IServiceCollection AddCustomizedDataStore(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContextPool<ApplicationDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"), b => b.MigrationsAssembly("AwesomeCMSCore")));

            services.AddIdentity<IdentityUser, IdentityRole>().AddEntityFrameworkStores<ApplicationDbContext>();

            return services;
        }

        public static IServiceCollection UseIdentityServer(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddIdentityServer()
                .AddDeveloperSigningCredential()
                // this adds the config data from DB (clients, resources)
                .AddConfigurationStore(options =>
                {
                    options.ConfigureDbContext = builder =>
                        builder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"), sql => sql.MigrationsAssembly("AwesomeCMSCore"));
                })
                // this adds the operational data from DB (codes, tokens, consents)
                .AddOperationalStore(options =>
                {
                    options.ConfigureDbContext = builder =>
                        builder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"), sql => sql.MigrationsAssembly("AwesomeCMSCore"));

                    // this enables automatic token cleanup. this is optional.
                    options.EnableTokenCleanup = true;
                    options.TokenCleanupInterval = 30;
                })
                .AddAspNetIdentity<IdentityUser>();

            return services;
        }
    }

    //public class MvcConfiguration : IDesignTimeMvcBuilderConfiguration
    //{
    //    private class DirectReferenceAssemblyResolver : ICompilationAssemblyResolver
    //    {
    //        public bool TryResolveAssemblyPaths(CompilationLibrary library, List<string> assemblies)
    //        {
    //            if (!string.Equals(library.Type, "reference", StringComparison.OrdinalIgnoreCase))
    //            {
    //                return false;
    //            }

    //            var paths = new List<string>();

    //            foreach (var assembly in library.Assemblies)
    //            {
    //                var path = Path.Combine(ApplicationEnvironment.ApplicationBasePath, assembly);

    //                if (!File.Exists(path))
    //                {
    //                    return false;
    //                }

    //                paths.Add(path);
    //            }

    //            assemblies.AddRange(paths);

    //            return true;
    //        }
    //    }

    //    public void ConfigureMvc(IMvcBuilder builder)
    //    {
    //        // .NET Core SDK v1 does not pick up reference assemblies so
    //        // they have to be added for Razor manually. Resolved for
    //        // SDK v2 by https://github.com/dotnet/sdk/pull/876 OR SO WE THOUGHT
    //        /*builder.AddRazorOptions(razor =>
    //        {
    //            razor.AdditionalCompilationReferences.Add(
    //                MetadataReference.CreateFromFile(
    //                    typeof(PdfHttpHandler).Assembly.Location));
    //        });*/

    //        // .NET Core SDK v2 does not resolve reference assemblies' paths
    //        // at all, so we have to hack around with reflection
    //        typeof(CompilationLibrary)
    //            .GetTypeInfo()
    //            .GetDeclaredField("<DefaultResolver>k__BackingField")
    //            .SetValue(null, new CompositeCompilationAssemblyResolver(new ICompilationAssemblyResolver[]
    //            {
    //                new DirectReferenceAssemblyResolver(),
    //                new AppBaseCompilationAssemblyResolver(),
    //                new ReferenceAssemblyPathResolver(),
    //                new PackageCompilationAssemblyResolver(),
    //            }));
    //    }
    //}
}
