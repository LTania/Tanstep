using RequirementsLab.Core.Abstractions;
using RequirementsLab.Core.DTO.Account;
using RequirementsLab.DAL;

namespace RequirementsLab.Services
{
    public class AccountService : IAccountService
    {
        private readonly RequirementsLabContext context;

        public AccountService(RequirementsLabContext context)
        {
            this.context = context;
        }

        public UserStateDTO UserState(int id)
        {
            if (id == -1)
            {
                return new UserStateDTO
                {
                    LoggedIn = false,
                    UserId = -1,
                    StartingLevelTestPassed = false,
                };
            }
            else
            {
                var user = context.Users.Find(id);

                return new UserStateDTO
                {
                    LoggedIn = true,
                    UserId = id,
                    StartingLevelTestPassed = user.Level != -1f,
                };
            }
        }
    }
}
