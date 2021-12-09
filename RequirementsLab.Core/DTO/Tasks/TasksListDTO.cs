using System.Collections.Generic;

namespace RequirementsLab.Core.DTO.Tasks
{
    public class TasksListDTO
    {
        public List<TaskDTO> Tasks { get; set; }

        public List<string> TaskTypes { get; set; }
    }
}
