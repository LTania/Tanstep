using Microsoft.EntityFrameworkCore;
using RequirementsLab.Core.Abstractions;
using RequirementsLab.Core.DTO.Test;
using RequirementsLab.DAL;
using System.Collections.Generic;
using System.Linq;

namespace RequirementsLab.Services
{
    public class LevelTestService : ILevelTestService
    {
        private readonly RequirementsLabContext context;

        public LevelTestService(RequirementsLabContext context)
        {
            this.context = context;
        }

        public TestDTO Generate()
        {
            var questions = new List<QuestionDTO>();

            var difficultyGroups = context.Questions
                .Include(question => question.Variants)
                .AsEnumerable()
                .GroupBy(question => question.Difficulty)
                .ToDictionary(group => group.Key, group => group.ToList());

            var difficulties = difficultyGroups
                .Select(group => group.Key)
                .OrderByDescending(difficulty => difficulty)
                .ToList();

            var targetDifficulty = 7;

            var maxIterations = 5;

            for (var iteration = 0; iteration < maxIterations; ++iteration)
            {
                foreach (var difficulty in difficulties)
                {
                    if (difficulty <= targetDifficulty)
                    {
                        var difficultyQuestions = difficultyGroups[difficulty];

                        var count = difficultyQuestions.Count;

                        if (count != 0)
                        {
                            var question = difficultyQuestions[count - 1];

                            difficultyQuestions.RemoveAt(count - 1);

                            targetDifficulty -= difficulty;

                            var variants = question.Variants
                                .Select(variant => new VariantDTO
                                {
                                    Id = variant.Id,
                                    Text = variant.Text,
                                })
                                .ToList();

                            var dto = new QuestionDTO
                            {
                                Id = question.Id,
                                Text = question.Text,
                                Difficulty = question.Difficulty,
                                Variants = variants,
                            };

                            questions.Add(dto);
                        }
                    }
                }
            }

            return new TestDTO
            {
                Questions = questions,
            };
        }

        public TestResultDTO Check(TestAnswersDTO answersDTO, int userId)
        {
            var answers = answersDTO.Answers;
            var fullDifficulty = 0;
            var rightValue = 0;

            foreach (var answer in answers)
            {
                var questionId = answer.QuestionId;

                var question = context.Questions
                    .Where(q => q.Id == questionId)
                    .Include(q => q.Variants)
                    .First();

                var rightVariant = question.Variants.Find(variant => variant.IsRight);

                var difficulty = question.Difficulty;

                fullDifficulty += difficulty;

                if (rightVariant.Id == answer.VariantId)
                {
                    rightValue += difficulty;
                }
            }

            var level = (rightValue / (float) fullDifficulty) * 100;

            var levelName = "Новачок";

            if (level > 67f)
            {
                levelName = "Професіонал";
            }
            else
            {
                levelName = "Любитель";
            }

            var user = context.Users.Find(userId).Level = level;

            context.SaveChanges();

            return new TestResultDTO
            {
                Level = level,
                LevelName = levelName,
            };
        }
    }
}
