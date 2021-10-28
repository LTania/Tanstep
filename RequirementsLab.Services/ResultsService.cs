using RequirementsLab.Core.Abstractions;
using RequirementsLab.Core.Entities;
using RequirementsLab.DAL;
using System;

namespace RequirementsLab.Services
{
    public class ResultsService : IResultsService
    {
        private readonly RequirementsLabContext context;

        public ResultsService(RequirementsLabContext context)
        {
            this.context = context;
        }

        public void StoreResult(int taskId, int grade, int userId)
        {
            var record = new TaskResultRecord
            {
                Grade = grade,
                TaskId = taskId,
                Time = DateTime.Now,
                UserId = userId,
            };

            context.TaskResultRecords.Add(record);

            context.SaveChanges();
        }
    }
}
