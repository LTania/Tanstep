using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace RequirementsLab.Core.Entities
{
    public class User : IdentityUser<int>, IEntity
    {
        public float Level { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public List<TaskResultRecord> TaskResultRecords { get; set; }
    }
}
