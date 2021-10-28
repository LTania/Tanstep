using System.Collections.Generic;

namespace RequirementsLab.Core.DTO.Requirements
{
    public class RequirementsAnswersDTO
    {
        public int TaskId { get; set; }

        public List<RequirementDTO> Requirements { get; set; }
    }
}
