using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RequirementsLab.Core.Entities;

namespace RequirementsLab.DAL
{
    public class RequirementsLabContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        public DbSet<KeyWord> KeyWords { get; set; }

        public DbSet<PoorWord> PoorWords { get; set; }

        public DbSet<PoorWordTask> PoorWordTasks { get; set; }

        public DbSet<Question> Questions { get; set; }

        public DbSet<Requirement> Requirements { get; set; }

        public DbSet<RequirementForPWTask> RequirementsForPWTask { get; set; }

        public DbSet<RequirementKeyWord> RequirementKeyWords { get; set; }

        public DbSet<Task> Tasks { get; set; }

        public DbSet<TaskResultRecord> TaskResultRecords { get; set; }

        public DbSet<TaskType> TaskTypes { get; set; }

        public DbSet<Variant> Variants { get; set; }

        public RequirementsLabContext(DbContextOptions<RequirementsLabContext> options) : base(options) { }
    }
}
