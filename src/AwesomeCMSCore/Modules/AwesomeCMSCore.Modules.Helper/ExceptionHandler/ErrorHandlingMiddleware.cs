using System;
using System.Net;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Email;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Serilog;

namespace AwesomeCMSCore.Modules.Helper.ExceptionHandler
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IEmailSender _emailSender;
        private readonly IOptions<EmailSettings> _emailSetting;

        public ErrorHandlingMiddleware(RequestDelegate next, IEmailSender emailSender, IOptions<EmailSettings> emailSetting)
        {
            _next = next;
            _emailSender = emailSender;
            _emailSetting = emailSetting;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
                if (context.Request.Path.Value.StartsWith("/api") && context.Response.StatusCode != (int)HttpStatusCode.OK)
                {
                    await context.Response.WriteAsync(context.Response.StatusCode.ToString());
                }
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var stacktrace = exception.StackTrace;
            var exceptionMessage = exception.Message;
            var log = new LoggerConfiguration()
                .WriteTo.File("log.txt", outputTemplate: "{NewLine}[{Timestamp:HH:mm:ss}{Level:u3}]{Message}{NewLine}{Exception}{NewLine}-------------{NewLine}")
                .CreateLogger();

            log.Information($"{exceptionMessage}\r\n{stacktrace}");

            //await _emailSender.SendEmailAsync(_emailSetting.Value.SysAdminEmail, stacktrace, EmailType.SystemLog);
        }
    }
}
