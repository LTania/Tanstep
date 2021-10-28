using System.Collections.Generic;

namespace RequirementsLab.Core.Entities
{
    public class KeyWord : IEntity
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public List<RequirementKeyWord> RequirementKeyWords { get; set; }
    }
}
