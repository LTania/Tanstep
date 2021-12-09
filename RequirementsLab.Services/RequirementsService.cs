using Microsoft.EntityFrameworkCore;
using RequirementsLab.Core.Abstractions;
using RequirementsLab.Core.DTO.Requirements;
using RequirementsLab.DAL;
using System;
using System.Linq;

namespace RequirementsLab.Services
{
    public class RequirementsService : IRequirementsService
    {
        private readonly RequirementsLabContext context;

        public RequirementsService(RequirementsLabContext context)
        {
            this.context = context;
        }

        public RequirementsTaskDTO GetTask(int id)
        {
            var task = context.Tasks.Find(id);

            return new RequirementsTaskDTO
            {
                Id = task.Id,
                Description = task.Description,
            };
        }

        public RequirementsResultDTO Check(RequirementsAnswersDTO answers)
        {
            var taskId = answers.TaskId;
            
            var task = context.Tasks
                .Where(t => t.Id == taskId)
                .Include(t => t.Requirements)
                    .ThenInclude(r => r.RequirementKeyWords)
                        .ThenInclude(rk => rk.KeyWord)
                .First();

            var rightRequirements = task.Requirements;
            var requirements = answers.Requirements;

            var requirementsCount = requirements.Count;

            if (requirementsCount == 0)
            {
                return new RequirementsResultDTO
                {
                    Grade = 0,
                    Title = task.Title,
                };
            }

            var rightCount = rightRequirements.Count;

            var overalRootCount = 0;
            var foundRootCount = 0;

            var overalKeywordCount = 0;
            var foundKeywordCount = 0;

            var guessedPrioritiesCount = 0;

            foreach (var right in rightRequirements)
            {
                var rightDescription = right.Description;
                var rightRoots = rightDescription.Split(' ');

                overalRootCount += rightRoots.Length;
                overalKeywordCount += right.RequirementKeyWords.Count;

                float maxScore = -1;
                int rootsFound = -1;
                RequirementDTO maxRequirement = null;

                foreach (var requirement in requirements)
                {
                    var description = requirement.Description;
                    var roots = description.Split(' ');

                    var overallCount = 0;
                    var foundCount = 0;

                    foreach (var rightRoot in rightRoots)
                    {
                        ++overallCount;

                        foreach (var root in roots)
                        {
                            if (FindRoot(rightRoot, root))
                            {
                                ++foundCount;

                                break;
                            }
                        }
                    }

                    var score = foundCount / (float)overallCount;

                    if (score > maxScore)
                    {
                        maxScore = score;
                        maxRequirement = requirement;
                        rootsFound = foundCount;
                    }
                }

                foundRootCount += rootsFound;

                var keywords = maxRequirement.Keywords;

                foreach (var rightKeyword in right.RequirementKeyWords)
                {
                    var rightKeywordStr = rightKeyword.KeyWord.Text;

                    foreach (var keyword in keywords)
                    {
                        if (FindRoot(rightKeywordStr, keyword))
                        {
                            ++foundKeywordCount;

                            break;
                        }
                    }
                }

                if (Math.Abs(right.Priority - maxRequirement.Priority) <= 1)
                {
                    ++guessedPrioritiesCount;
                }
            }

            var countFactor = 1f;
            var countDiff = Math.Abs(rightCount - requirementsCount);

            if (countDiff != 0)
            {
                var mistake = countDiff / (float)rightCount;
                
                if (mistake > 1f)
                {
                    countFactor = 0f;
                }
                else
                {
                    countFactor = 1f - mistake;
                }
            }

            var rootFactor = foundRootCount / (float)overalRootCount;
            var keywordFactor = foundKeywordCount / (float)overalKeywordCount;
            var priorityFactor = 0;

            if(rightCount > 0)
            {
                priorityFactor = guessedPrioritiesCount / rightCount;
            }

            var grade = (
                countFactor * 0.2f + 
                rootFactor * 0.5f + 
                keywordFactor * 0.2f + 
                priorityFactor * 0.1f
            ) * 100f;

            return new RequirementsResultDTO
            {
                Grade = (int)grade,
                Title = task.Title,
            };
        }

        public bool FindRoot(string root, string word)
        {
            return word.Contains(root, StringComparison.InvariantCultureIgnoreCase);
        }
    }
}
