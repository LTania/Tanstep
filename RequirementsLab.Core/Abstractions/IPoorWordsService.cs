using RequirementsLab.Core.DTO.PoorWords;

namespace RequirementsLab.Core.Abstractions
{
    public interface IPoorWordsService
    {
        PoorWordsResultDTO CheckPoorWords(PoorWordsRequestDTO poorWords);
        RequirementsForPWTaskDTO GetRequirements(int id);
    }
}
