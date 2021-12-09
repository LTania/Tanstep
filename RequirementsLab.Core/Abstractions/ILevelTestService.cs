using RequirementsLab.Core.DTO.Test;

namespace RequirementsLab.Core.Abstractions
{
    public interface ILevelTestService
    {
        TestDTO Generate();

        TestResultDTO Check(TestAnswersDTO answers, int userId);
    }
}
