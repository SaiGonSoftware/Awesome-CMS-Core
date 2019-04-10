using System;
using System.Threading.Tasks;

namespace AwesomeCMSCore.Modules.Helper.ExceptionHandler
{
	public interface IExceptionHandler
	{
		Task HandleExceptionAsync(Exception exception);
	}
}
