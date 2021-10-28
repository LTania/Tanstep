using System.Collections.Generic;

namespace RequirementsLab.Core.Entities
{
    public class RequirementForPWTask : IEntity
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public int TaskId { get; set; }

    }
}
