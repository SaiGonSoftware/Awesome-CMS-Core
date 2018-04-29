﻿using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;

namespace AwesomeCMSCore.Modules.Helper.Extensions
{
    public static class RandomString
    {
        private static readonly Random Random = new Random();

        public static string GenerateRandomString()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars.ToLower(CultureInfo.InvariantCulture), 20)
                .Select(s => s[Random.Next(s.Length)]).ToArray());
        }
    }
}
