using System.Collections.Generic;

namespace RequirementsLab.Core.Entities
{
    public class Task : IEntity
    {
        public int Id { get; set; }

        public int Difficulty { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public TaskType TaskType { get; set; }

        public int? TaskTypeId { get; set; }

        public List<Requirement> Requirements { get; set; }

        public List<PoorWordTask> PoorWordTasks { get; set; }

        public List<TaskResultRecord> TaskResultRecords { get; set; }
    }
}
