using Microsoft.EntityFrameworkCore;
using RequirementsLab.Core.Abstractions;
using RequirementsLab.Core.Entities;
using RequirementsLab.DAL;
using System.Linq;
using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;


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
            var user = context.Users.Find(userId);
            var task = context.Tasks.Find(taskId);
            var taskTypeId = task.TaskTypeId;

            int diff;
            
            try
            {
                TaskResultRecord bestResult = context.TaskResultRecords
                    .AsQueryable()
                    .Include(record => record.Task)
                    .Where(record => record.Task.TaskTypeId == taskTypeId)
                    .OrderByDescending(record => record.Grade)
                    .First();

                diff = grade - bestResult.Grade;
            }
            catch (Exception)
            {
                diff = grade;
            }

            if (diff > 0)
            {
                diff *= task.Difficulty;

                user.Level += diff * 0.2f;

                context.Entry(user).CurrentValues.SetValues(user);
            }

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
        public dynamic GetResults(int userId)
        {
            var currentUser = context.Users
            .Where(u => u.Id == userId)
            .Select(u => new
            {
                firstName = u.Name,
                lastName = u.Surname
            })
            .First();

            var userTasksGrouped = context.TaskResultRecords
            .Where(res => res.UserId == userId)
            .Include(taskRes => taskRes.Task)
                .ThenInclude(res => res.TaskType)
            .AsEnumerable()
            .GroupBy(res => res.TaskId)
            .ToList()
            .Select(g => new
            {
                TaskId = g.Key,
                TaskTypeId = g.First().Task.TaskTypeId,
                TaskTypeName = g.First().Task.TaskType.Name,
                Count = g.Count(),
                MaxGrade = g.Max(item => item.Grade),
                AvgGrade = g.Average(item => item.Grade),
                TaskTitle = g.First().Task.Title
            })
            .ToList();

            var userTasks = context.TaskResultRecords
            .Include(res => res.Task)
            .Where(res => res.UserId == userId)
            .Select(task => new {
                Id = task.Task.Id,
                TaskTitle = task.Task.Title,
                TimeStamp = task.Time,
                Grade = task.Grade,
            })
            .ToList();

            var tasksInDb = context.Tasks
            .Select(task => new {
                TaskTitle = task.Title
            })
            .ToList();

            var overallGrade = 0;
            var finishedTasksCount = userTasksGrouped.Count;
            var overallTasksCount = tasksInDb.Count;

            userTasksGrouped.ForEach(userTask => 
            {
                overallGrade += userTask.MaxGrade;
            });

            overallGrade /= overallTasksCount;

            var finalUserTasksGrouped = userTasksGrouped
            .GroupBy(
                res => res.TaskTypeId,
                (key, g) => new
                {
                    TaskTypeId = key,
                    TaskTypeName = g.First().TaskTypeName,
                    TaskName = g.First().TaskTitle,
                    GroupedTasks = g.ToList(),
                }
            );

            return new {
                CurrentUser = currentUser,
                OverallGrade = overallGrade,
                GroupedUserTasks = finalUserTasksGrouped,
                AllUserTasksResults = userTasks,
                FinishedTasksCount = finishedTasksCount,
                OverallTasksCount = overallTasksCount,
            };

        }
    }
}
