using System;
using System.Collections.Generic;
using System.Text;

namespace AwesomeCMSCore.Modules.Helper.Extensions
{
	public interface IJsonParseService<T> where T : class
	{
		T ToObject(string json);
	}
}
