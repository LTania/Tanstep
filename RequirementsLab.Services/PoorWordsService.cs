using RequirementsLab.Core.Abstractions;
using RequirementsLab.Core.DTO.PoorWords;
using RequirementsLab.DAL;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using RequirementsLab.Core.Entities;

namespace RequirementsLab.Services
{
    public class PoorWordsService : IPoorWordsService
    {
        private readonly RequirementsLabContext context;

        public PoorWordsService(RequirementsLabContext context)
        {
            this.context = context;
        }

        public PoorWordsResultDTO CheckPoorWords(PoorWordsRequestDTO poorWords)
        {
            var taskId = poorWords.taskId;
            var pwArray = poorWords.poorWords;

            var requirementIDs = context.RequirementsForPWTask
                .Where(req => req.TaskId == taskId)
                .Select(req => req.Id)
                .ToList();

            var poorWordsFromDB = context.PoorWords
                .Where(pw => requirementIDs.Contains(pw.RequirementId)) 
                .Select(pw => new PoorWordDTO
                {
                    Text = pw.Text,
                })
                .Distinct()
                .ToList();

            var poorWordsMatched = context.PoorWords
                .Where(pw => requirementIDs.Contains(pw.RequirementId))
                .Where(pw => pwArray.Contains(pw.Text))
                .Select(pw => new PoorWordDTO
                {
                    Text = pw.Text,
                })
                .Distinct()
                .ToList();

            int grade = (int)(((float)poorWordsMatched.Count / poorWordsFromDB.Count) * 100);
            int notMatchedCount = pwArray.Count - poorWordsMatched.Count;

            if(pwArray.Count!=0)
            {
                grade -= grade / pwArray.Count * notMatchedCount;
            }
            else
            {
                grade = 0;
            }
            
            string resultTitle;
            if (grade < 33)
            {
                resultTitle = "Незадовільний результат";
            }
            else if(grade >= 33 && grade < 80)
            {
                resultTitle = "Добрий результат";
            }
            else
            {
                resultTitle = "Відмінний результат";
            }

            return new PoorWordsResultDTO
            {
                Grade = grade,
                NotMatched = notMatchedCount,
                Title = resultTitle,
            };
        }

        public RequirementsForPWTaskDTO GetRequirements(int taskId)
        {
            var tasks = context.RequirementsForPWTask
               .Where(requirement => requirement.TaskId == taskId)
               .Select(requirement => new RequirementForPWTaskDTO
               {
                   Id = requirement.Id,
                   Title = requirement.Title,
               })
               .ToList();

            return new RequirementsForPWTaskDTO
            {
                Requirements = tasks
            };
        }
    }
}
