using System;

namespace RequirementsLab.Core.Entities
{
    public class TaskResultRecord : IEntity
    {
        public int Id { get; set; }

        public DateTime? Time { get; set; }

        public int Grade { get; set; }

        public Task Task { get; set; }

        public int? TaskId { get; set; }

        public User User { get; set; }

        public int? UserId { get; set; }
    }
}
