using Microsoft.AspNetCore.Mvc.Razor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AwesomeCMSCore.Infrastructure
{
    public class ModuleViewLocationExpander : IViewLocationExpander
    {
        private const string MODULE_KEY = "module";
        public IEnumerable<string> ExpandViewLocations(ViewLocationExpanderContext context, IEnumerable<string> viewLocations)
        {
            if (context.Values.ContainsKey(MODULE_KEY))
            {
                var module = context.Values[MODULE_KEY];
                if (!string.IsNullOrWhiteSpace(MODULE_KEY))
                {
                    var moduleViewLocations = new string[]
                       {
                        $"/Modules/{module}/Views/{{1}}/{{0}}.cshtml",
                        $"/Modules/{module}/Views/Shared/{{0}}.cshtml",
                       };

                    viewLocations = moduleViewLocations.Concat(viewLocations);
                }
            }
            
            return viewLocations;
        }

        /// <summary>
        /// Help to extract module name
        /// </summary>
        /// <param name="context"></param>
        public void PopulateValues(ViewLocationExpanderContext context)
        {
            var controllerName = context.ActionContext.ActionDescriptor.DisplayName;
            // Get assembly name
            var moduleName = controllerName.Split('(', ')')[1];
            context.Values[MODULE_KEY] = moduleName;
        }
    }
}
