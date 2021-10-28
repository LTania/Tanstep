using System.Collections.Generic;

namespace RequirementsLab.Core.Entities
{
    public class PoorWord : IEntity
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public List<PoorWordTask> PoorWordTasks { get; set; }
    }
}
