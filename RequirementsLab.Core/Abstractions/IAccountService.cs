using RequirementsLab.Core.DTO.Account;

namespace RequirementsLab.Core.Abstractions
{
    public interface IAccountService
    {
        UserStateDTO UserState(int id);
    }
}
