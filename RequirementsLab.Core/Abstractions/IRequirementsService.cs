using RequirementsLab.Core.DTO.Requirements;

namespace RequirementsLab.Core.Abstractions
{
    public interface IRequirementsService
    {
        RequirementsTaskDTO GetTask(int id);

        RequirementsResultDTO Check(RequirementsAnswersDTO answers);
    }
}
