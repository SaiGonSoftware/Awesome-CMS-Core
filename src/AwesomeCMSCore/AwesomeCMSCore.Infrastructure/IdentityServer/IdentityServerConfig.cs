using IdentityServer4.Models;
using IdentityServer4.Test;
using System.Collections.Generic;
using System.Security.Claims;
using IdentityModel;

namespace AwesomeCMSCore.Infrastructure.IdentityServer
{
    public static class IdentityServerConfig
    {
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("api1", "My API")
            };
        }

        public static List<TestUser> GetUsers()
        {
            return new List<TestUser>
            {
                new TestUser
                {
                    SubjectId = "1",
                    Username = "alice",
                    Password = "password"
                },
                new TestUser
                {
                    SubjectId = "2",
                    Username = "bob",
                    Password = "password"
                }
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                // other clients omitted...
               // return new List<Client>
                //    {
                //        new Client
                //        {
                //            ClientId = "client",
                //            // no interactive user, use the clientid/secret for authentication
                //            AllowedGrantTypes = GrantTypes.ClientCredentials,

                //            // secret for authentication
                //            ClientSecrets =
                //            {
                //                new Secret("secret".Sha256())
                //            },

                //            // scopes that client has access to
                //            AllowedScopes = { "api1" }
                //        }
                //    };
            // resource owner password grant client
            new Client
                {
                    ClientId = "ro.client",
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,

                    ClientSecrets =
                    {
                        new Secret("secret".Sha256())
                    },
                    AllowedScopes = { "api1" }
                }
            };
        }
    }

    public class Users
    {
        public static List<TestUser> Get()
        {
            return new List<TestUser> {
                new TestUser {
                    SubjectId = "5BE86359-073C-434B-AD2D-A3932222DABE",
                    Username = "phuc",
                    Password = "070695",
                    Claims = new List<Claim> {
                        new Claim(JwtClaimTypes.Email, "ngohungphuc95@gmail.com"),
                        new Claim(JwtClaimTypes.Role, "admin")
                    }
                }
            };
        }
    }
}
