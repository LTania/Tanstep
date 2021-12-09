using System.Collections.Generic;

namespace RequirementsLab.Core.DTO.Test
{
    public class QuestionDTO
    {
        public int Id { get; set; }

        public int Difficulty { get; set; }

        public string Text { get; set; }

        public List<VariantDTO> Variants { get; set; }
    }
}
