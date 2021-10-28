using System.Collections.Generic;

namespace RequirementsLab.Core.DTO.Requirements
{
    public class RequirementDTO
    {
        public string Description { get; set; }

        public int Priority { get; set; }

        public List<string> Keywords { get; set; }
    }
}
