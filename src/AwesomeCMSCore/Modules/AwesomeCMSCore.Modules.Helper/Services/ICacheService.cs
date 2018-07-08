using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Caching.Distributed;

namespace AwesomeCMSCore.Modules.Helper.Services
{
    public interface ICacheService: IDistributedCache
    {
    }
}
