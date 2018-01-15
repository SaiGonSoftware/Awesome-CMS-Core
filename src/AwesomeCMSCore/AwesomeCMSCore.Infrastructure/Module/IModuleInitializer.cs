using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace AwesomeCMSCore.Infrastructure.Module
{
    public interface IModuleInitializer
    {
        void Init(IServiceCollection serviceCollection);
    }
}
