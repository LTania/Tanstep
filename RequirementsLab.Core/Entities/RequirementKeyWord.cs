namespace RequirementsLab.Core.Entities
{
    public class RequirementKeyWord : IEntity
    {
        public int Id { get; set; }

        public Requirement Requirement { get; set; }

        public int? RequirementId { get; set; }

        public KeyWord KeyWord { get; set; }

        public int? KeyWordId { get; set; }
    }
}
