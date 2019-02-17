using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Entities.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace AwesomeCMSCore.Modules.Entities.Data
{
	public static class SeedData
	{
		private static readonly User tony;
		private static readonly User tony1;
		private static readonly User tony2;
		private static readonly User tony3;
		private static readonly User tony4;
		private static readonly User tony5;
		private static readonly Post post;
		private static readonly List<Comment> comments;
		private static readonly Comment comment;
		private static readonly Comment comment1;
		static SeedData()
		{
			tony = new User
			{
				Id = new Guid("c3e40e7f-aca2-4f55-ae88-44a44f64dd12").ToString(),
				Email = "ngohungphuc95@gmail.com",
				NormalizedEmail = "ngohungphuc95@gmail.com".ToUpper(),
				UserName = "tony",
				NormalizedUserName = "tony".ToUpper(),
				EmailConfirmed = true,
				PhoneNumberConfirmed = true,
				LockoutEnabled = false,
				SecurityStamp = Guid.NewGuid().ToString()
			};

			tony1 = new User
			{
				Id = new Guid("8dd1feb6-8068-4593-83b8-291f523483dc").ToString(),
				Email = "ngohungphuc1@gmail.com",
				NormalizedEmail = "ngohungphuc1@gmail.com".ToUpper(),
				UserName = "tony1",
				NormalizedUserName = "tony1".ToUpper(),
				EmailConfirmed = true,
				PhoneNumberConfirmed = true,
				LockoutEnabled = false,
				SecurityStamp = Guid.NewGuid().ToString()
			};

			tony2 = new User
			{
				Id = new Guid("68627c5a-5788-4820-bd9d-0034d3f0239b").ToString(),
				Email = "ngohungphuc2@gmail.com",
				NormalizedEmail = "ngohungphuc2@gmail.com".ToUpper(),
				UserName = "tony2",
				NormalizedUserName = "tony2".ToUpper(),
				EmailConfirmed = true,
				PhoneNumberConfirmed = true,
				LockoutEnabled = false,
				SecurityStamp = Guid.NewGuid().ToString()
			};

			tony3 = new User
			{
				Id = new Guid("92bf0744-98e0-4ae7-b1de-0cddf5327989").ToString(),
				Email = "ngohungphuc3@gmail.com",
				NormalizedEmail = "ngohungphuc3@gmail.com".ToUpper(),
				UserName = "tony3",
				NormalizedUserName = "tony3".ToUpper(),
				EmailConfirmed = true,
				PhoneNumberConfirmed = true,
				LockoutEnabled = false,
				SecurityStamp = Guid.NewGuid().ToString()
			};

			tony4 = new User
			{
				Id = new Guid("4d272cc9-c2ff-42eb-8afc-5509353fdf42").ToString(),
				Email = "ngohungphuc7695@gmail.com",
				NormalizedEmail = "ngohungphuc7695@gmail.com".ToUpper(),
				UserName = "tony4",
				NormalizedUserName = "tony4".ToUpper(),
				EmailConfirmed = true,
				PhoneNumberConfirmed = true,
				LockoutEnabled = false,
				SecurityStamp = Guid.NewGuid().ToString()
			};

			tony5 = new User
			{
				Id = new Guid("a1add451-7dd2-46fd-9877-1996e3f1fb4c").ToString(),
				Email = "ngohungphuc5@gmail.com",
				NormalizedEmail = "ngohungphuc5@gmail.com".ToUpper(),
				UserName = "tony5",
				NormalizedUserName = "tony5".ToUpper(),
				EmailConfirmed = true,
				PhoneNumberConfirmed = true,
				LockoutEnabled = false,
				SecurityStamp = Guid.NewGuid().ToString()
			};

			comment1 = new Comment
			{
				CommentStatus = CommentStatus.Approved,
				Content = "Parent comment",
				User = tony4
			};

			comments = new List<Comment>
				{
					new Comment
					{
						ParentComment = comment1,
						CommentStatus = CommentStatus.Approved,
						Content = "comment",
						User = tony3
					}
				};

			post = new Post
			{
				User = tony5,
				PostStatus = PostStatus.Published,
				Content =
					"<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<p><span style=\"color: #495762; font-family: Karla, Tahoma, sans-serif; font-size: 16px;\">MassTransit is a free, open source, lightweight message bus for creating distributed applications using the .NET framework. MassTransit provides an extensive set of features on top existing message transports, resulting in a developer friendly way to asynchronously connect services using message-based conversation patterns. Message-based communication is a reliable and scalable way to implement a service oriented architecture.</span></p>\n</body>\n</html>",
				ShortDescription = "MassTransit",
				Title = "MassTransit with ASP.Net Core 2.1"
			};
		}

		#region snippet_Initialize

		public static async Task Initialize(IServiceProvider serviceProvider)
		{
			using (var context = new ApplicationDbContext(
				serviceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
			{
				var roles = new[]
					{"Owner", "Administrator", "Editor", "ContentWriter"};

				var roles1 = new[]
					{"Administrator"};

				var roles2 = new[]
					{"Editor"};

				var roles4 = new[]
					{"Owner", "Administrator"};

				if (!context.Roles.Any())
				{
					foreach (var role in roles)
					{
						var roleStore = new RoleStore<ApplicationRole>(context);

						await roleStore.CreateAsync(new ApplicationRole
						{
							Name = role,
							NormalizedName = role.ToUpper()
						});
					}
				}

				if (!context.Users.Any())
				{
					await SeedUser(tony, context, serviceProvider, roles4);
					await SeedUser(tony1, context, serviceProvider, roles1);
					await SeedUser(tony2, context, serviceProvider, roles2);
					await SeedUser(tony3, context, serviceProvider, roles2);
					await SeedUser(tony4, context, serviceProvider, roles2);
					await SeedUser(tony5, context, serviceProvider, roles2);
				}

				if (!context.Posts.Any())
				{
					comments[0].Post = post;
					comment1.Post = post;
					post.Comments = comments;

					await SeedPost(context);
				}

				if (!context.PostOptions.Any())
				{
					await SeedCatAndTag(context);
				}
			}
		}

		private static async Task EnsureRole(IServiceProvider serviceProvider, string email, string[] roles)
		{
			var userManager = serviceProvider.GetService<UserManager<User>>();

			var user = await userManager.FindByEmailAsync(email);

			await userManager.AddToRolesAsync(user, roles);
		}

		private static async Task SeedUser(User user, ApplicationDbContext context, IServiceProvider serviceProvider,
			string[] roles)
		{
			var password = new PasswordHasher<User>();
			var hashed = password.HashPassword(user, "123456");
			user.PasswordHash = hashed;
			var userStore = new UserStore<User>(context);

			await userStore.CreateAsync(user);
			await EnsureRole(serviceProvider, user.Email, roles);
			await context.SaveChangesAsync();
		}

		private static async Task SeedPost(ApplicationDbContext context)
		{
			await context.AddAsync(post);
			await context.SaveChangesAsync();
		}

		private static async Task SeedCatAndTag(ApplicationDbContext context)
		{
			var categorie = new PostOption
			{
				User = tony,
				Key = "[\"Web\",\"Mobile\"]",
				Value =
					"[{\"value\":\"Web\",\"label\":\"Web\",\"className\":\"Select-create-option-placeholder\"},{\"value\":\"Mobile\",\"label\":\"Mobile\",\"className\":\"Select-create-option-placeholder\"}]",
				OptionType = PostOptionType.CategorieOptions
			};

			var tag = new PostOption
			{
				User = tony,
				Key = "[\"ASP.Net\",\"React\"]",
				Value =
					"[{\"value\":\"ASP.Net\",\"label\":\"ASP.Net\",\"className\":\"Select-create-option-placeholder\"},{\"value\":\"React\",\"label\":\"React\",\"className\":\"Select-create-option-placeholder\"}]",
				OptionType = PostOptionType.TagOptions
			};

			await context.AddAsync(categorie);
			await context.AddAsync(tag);
			await context.SaveChangesAsync();
		}
		#endregion
	}
}