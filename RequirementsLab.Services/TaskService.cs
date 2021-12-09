using Microsoft.EntityFrameworkCore;
using RequirementsLab.Core.Abstractions;
using RequirementsLab.Core.DTO.Tasks;
using RequirementsLab.DAL;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RequirementsLab.Services
{
    public class TaskService : ITaskService
    {
        private readonly RequirementsLabContext context;

        public TaskService(RequirementsLabContext context)
        {
            this.context = context;
        }

        public TasksListDTO GetTasks(int userId)
        {
            var taskTypes = context.TaskTypes
                .Select(type => type.Name)
                .ToList();

            var user = context.Users.Find(userId);
            var userLevel = user.Level;
            var userDifficulty = Math.Clamp((int)(userLevel * 3 / 100f) + 1, 1, 3);

            var tasks = context.Tasks
                .Where(task => task.Difficulty <= userDifficulty)
                .Include(task => task.TaskType)
                .Select(task => new TaskDTO
                {
                    Id = task.Id,
                    Title = task.Title,
                    Difficulty = task.Difficulty,
                    TaskType = task.TaskType.Name,
                })
                .ToList();

            return new TasksListDTO
            {
                Tasks = tasks,
                TaskTypes = taskTypes,
            };
        }
    }
}
