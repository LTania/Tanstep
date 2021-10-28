using System.Collections.Generic;

namespace RequirementsLab.Core.Entities
{
    public class Question : IEntity
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public int Difficulty { get; set; }

        public List<Variant> Variants { get; set; }
    }
}
