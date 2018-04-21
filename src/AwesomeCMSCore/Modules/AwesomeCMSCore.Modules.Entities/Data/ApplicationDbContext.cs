using AwesomeCMSCore.Modules.Entities.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AwesomeCMSCore.Modules.Entities.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public DbSet<Media> Medias { get; set; }
        public DbSet<Post> Posts { get; set; }
        //public DbSet<TagGroup> TagGroups { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Theme> Themes { get; set; }
        public DbSet<TagOptions> TagOptions { get; set; } 
        public DbSet<ApplicationGroup> ApplicationGroups { get; set; }
        public DbSet<ApplicationUserGroup> ApplicationUserGroups { get; set; }
        public DbSet<ApplicationGroupRole> ApplicationRoleGroups { get; set; }

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); 
            modelBuilder.Entity<ApplicationGroupRole>().HasKey(t => new { t.RoleId, t.GroupId });
            modelBuilder.Entity<ApplicationGroupRole>()
                .HasOne(p => p.Group)
                .WithMany(t => t.Roles)
                .HasForeignKey(t => t.GroupId);
            modelBuilder.Entity<ApplicationUserGroup>().HasKey(t => new { t.GroupId, t.UserId });
            modelBuilder.Entity<ApplicationUserGroup>()
                .HasOne(p => p.User)
                .WithMany(t => t.Groups)
                .HasForeignKey(t => t.UserId); 
            modelBuilder.EnableAutoHistory(null);
        }
    }
}
