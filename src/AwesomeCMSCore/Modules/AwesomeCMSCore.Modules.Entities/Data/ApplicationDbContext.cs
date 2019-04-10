using System.Linq;
using AwesomeCMSCore.Modules.Entities.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AwesomeCMSCore.Modules.Entities.Data
{
	public class ApplicationDbContext : IdentityDbContext<User>
	{
		public DbSet<Media> Medias { get; set; }
		public DbSet<Post> Posts { get; set; }
		public DbSet<Comment> Comments { get; set; }
		public DbSet<Theme> Themes { get; set; }
		public DbSet<PasswordRequest> PasswordRequests { get; set; }
		public DbSet<PostOption> PostOptions { get; set; }
		public DbSet<NewsLetter> NewsLetters { get; set; }
		public DbSet<Settings> Settings { get; set; }

		public ApplicationDbContext(DbContextOptions options) : base(options)
		{
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
			{
				relationship.DeleteBehavior = DeleteBehavior.Restrict;
			}

			modelBuilder.Entity<User>().HasMany(u => u.Claims).WithOne().HasForeignKey(c => c.UserId).IsRequired().OnDelete(DeleteBehavior.Cascade);
			modelBuilder.Entity<User>().HasMany(u => u.Roles).WithOne().HasForeignKey(r => r.UserId).IsRequired().OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<ApplicationRole>().HasMany(r => r.Claims).WithOne().HasForeignKey(c => c.RoleId).IsRequired().OnDelete(DeleteBehavior.Cascade);
			modelBuilder.Entity<ApplicationRole>().HasMany(r => r.Users).WithOne().HasForeignKey(r => r.RoleId).IsRequired().OnDelete(DeleteBehavior.Cascade);

			modelBuilder.EnableAutoHistory(null);

			modelBuilder.Entity<Post>()
				.HasOne(p => p.Medias)
				.WithOne(m => m.Post)
				.HasForeignKey<Media>(p => p.PostId);
		}
	}
}
