using System.Collections.Generic;

namespace RequirementsLab.Core.Entities
{
    public class Requirement : IEntity
    {
        public int Id { get; set; }

        public int Priority { get; set; }

        public string Description { get; set; }
        
        public string Title { get; set; }

        public Task Task { get; set; }

        public int? TaskId { get; set; }

        public List<RequirementKeyWord> RequirementKeyWords { get; set; }
    }
}
