using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Serilog;
using Serilog.Formatting.Compact;
using Serilog.Formatting.Display;
using Serilog.Formatting.Json;
using Serilog.Sinks.Email;

namespace AwesomeCMSCore.Modules.Helper.ExceptionHandler
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var statusCode = context.Response.StatusCode;
            var stacktrace = exception.StackTrace;
            var result = JsonConvert.SerializeObject(new { error = exception.Message });

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;

            var log = new LoggerConfiguration()
                .WriteTo.File("log.txt", outputTemplate: "{NewLine}[{Timestamp:HH:mm:ss}{Level:u3}]{Message:lj}{Exception}{NewLine}-------------{NewLine}")
                .CreateLogger();
            log.Information(stacktrace);

            return context.Response.WriteAsync(result);
        }
    }
}
