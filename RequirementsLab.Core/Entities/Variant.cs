namespace RequirementsLab.Core.Entities
{
    public class Variant : IEntity
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public bool IsRight { get; set; }

        public int? QuestionId { get; set; }

        public Question Question { get; set; }
    }
}
