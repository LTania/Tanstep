namespace RequirementsLab.Core.DTO.Account
{
    public class UserStateDTO
    {
        public bool LoggedIn { get; set; }

        public int UserId { get; set; }

        public bool StartingLevelTestPassed { get; set; }
    }
}
