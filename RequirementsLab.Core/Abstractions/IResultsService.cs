using RequirementsLab.Core.DTO.Tasks;

namespace RequirementsLab.Core.Abstractions
{
    public interface IResultsService
    {
        void StoreResult(int taskId, int grade, int userId);
    }
}
