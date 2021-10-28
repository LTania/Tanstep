using System.Collections.Generic;

namespace RequirementsLab.Core.DTO.PoorWords
{
    public class PoorWordsRequestDTO
    {
        public List<string> poorWords { get; set; }

        public int taskId { get; set; }
    }
}
