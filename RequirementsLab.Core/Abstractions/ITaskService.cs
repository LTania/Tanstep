using RequirementsLab.Core.DTO.Tasks;

namespace RequirementsLab.Core.Abstractions
{
    public interface ITaskService
    {
        TasksListDTO GetTasks(int userId);
    }
}
