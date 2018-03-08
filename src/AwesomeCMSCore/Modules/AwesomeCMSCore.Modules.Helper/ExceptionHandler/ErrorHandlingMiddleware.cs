using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Helper.Email;
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
        private readonly IEmailSender _emailSender;

        public ErrorHandlingMiddleware(RequestDelegate next, IEmailSender emailSender)
        {
            _next = next;
            _emailSender = emailSender;
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

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
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

            _emailSender.SendEmailAsync("", stacktrace, EmailType.SystemLog);
            return context.Response.WriteAsync(result);
        }
    }
}
