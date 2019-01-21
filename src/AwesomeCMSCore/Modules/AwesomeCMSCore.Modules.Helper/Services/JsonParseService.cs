using AwesomeCMSCore.Modules.Helper.Extensions;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace AwesomeCMSCore.Modules.Helper.Services
{
	public class JsonParseService<T> : IJsonParseService<T> where T : class
	{
		public T ToObject(string json)
		{
			return JObject.Parse(json).Root.ToObject<T>();
		}
	}
}
