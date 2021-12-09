using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RequirementsLab.Core.Abstractions;
using RequirementsLab.Core.DTO.Tasks;
using RequirementsLab.Core.Entities;

namespace RequirementsLab.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService taskService;
        private readonly UserManager<User> userManager;

        public TaskController(ITaskService taskService, UserManager<User> userManager)
        {
            this.taskService = taskService;
            this.userManager = userManager;
        }

        [HttpGet]
        [Route("GetTasks/")]
        public TasksListDTO GetTasks()
        {
            return taskService.GetTasks(Me());
        }

        private int Me()
        {
            var idStr = userManager.GetUserId(HttpContext.User);

            return int.TryParse(idStr, out var id) ? id : -1;
        }
    }
}
