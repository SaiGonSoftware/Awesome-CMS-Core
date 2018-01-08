using AwesomeCMSCore.Infrastructure;
using AwesomeCMSCore.Module.Entities.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;

namespace AwesomeCMSCore.Module.Entities.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public DbSet<Media> Medias { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<TagGroup> TagGroups { get; set; }
        public DbSet<Tags> Tags { get; set; }

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
    }
}
