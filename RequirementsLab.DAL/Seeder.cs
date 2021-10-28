using System.Collections.Generic;
using System.Linq;
using RequirementsLab.Core.Entities;

namespace RequirementsLab.DAL
{
    public static class Seeder
    {
        public static void Seed(RequirementsLabContext context)
        {
            SeedTaskTypes(context);
            //SeedAdmin(context);

            context.SaveChanges();
        }

        private static void SeedTaskTypes(RequirementsLabContext context)
        {
            if (!context.TaskTypes.Any())
            {
                context.TaskTypes.AddRange(TaskTypes.Select(record => record.Value));
            }
        }

        private static Dictionary<string, TaskType> taskTypes;

        public static Dictionary<string, TaskType> TaskTypes
        {
            get
            {
                if (taskTypes == null)
                {
                    taskTypes = new Dictionary<string, TaskType>
                    {
                        {
                            "Видобування вимог",
                            new TaskType()
                            {
                                Name = "Видобування вимог"
                            }
                        },
                        {
                            "Виявлення poor words",
                            new TaskType()
                            {
                                Name = "Виявлення poor words"
                            }
                        },
                    };
                }

                return taskTypes;
            }
        }
    }
}
