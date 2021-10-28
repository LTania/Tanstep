namespace RequirementsLab.Core.Entities
{
    public class PoorWordTask : IEntity
    {
        public int Id { get; set; }

        public Task Task { get; set; }

        public int? TaskId { get; set; }

        public PoorWord PoorWord { get; set; }

        public int? PoorWordId { get; set; }
    }
}
