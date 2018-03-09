using System;
using System.Net;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Entities.Settings;
using AwesomeCMSCore.Modules.Helper.Email;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
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
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var stacktrace = exception.StackTrace;
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var log = new LoggerConfiguration()
                .WriteTo.File("log.txt", outputTemplate: "{NewLine}[{Timestamp:HH:mm:ss}{Level:u3}]{Message:lj}{Exception}{NewLine}-------------{NewLine}")
                .CreateLogger();
            log.Information(stacktrace);

            //_emailSender.SendEmailAsync(_emailSetting.Value.SysAdminEmail, stacktrace, EmailType.SystemLog);
        }
    }
}
