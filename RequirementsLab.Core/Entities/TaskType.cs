using System.Collections.Generic;

namespace RequirementsLab.Core.Entities
{
    public class TaskType : IEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public List<Task> Tasks { get; set; }
    }
}
