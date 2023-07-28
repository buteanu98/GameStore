using GameStore.Entities;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<GameEntity> Games { get; set; }
    }
}
