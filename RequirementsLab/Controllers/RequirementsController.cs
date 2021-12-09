using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RequirementsLab.Core.Abstractions;
using RequirementsLab.Core.DTO.Requirements;
using RequirementsLab.Core.Entities;

namespace RequirementsLab.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RequirementsController : ControllerBase
    {
        private readonly IRequirementsService requirementsService;
        private readonly IResultsService resultsService;
        private readonly UserManager<User> userManager;

        public RequirementsController(IRequirementsService requirementsService, IResultsService resultsService, UserManager<User> userManager)
        {
            this.requirementsService = requirementsService;
            this.resultsService = resultsService;
            this.userManager = userManager;
        }

        [HttpGet]
        [Route("GetTask/{id}")]
        public RequirementsTaskDTO GetTask([FromRoute] int id)
        {
            return requirementsService.GetTask(id);
        }

        [HttpPost]
        [Route("Check")]
        public RequirementsResultDTO GetTask([FromBody] RequirementsAnswersDTO answers)
        {
            var result = requirementsService.Check(answers);

            resultsService.StoreResult(answers.TaskId, result.Grade, Me());

            return result;
        }

        private int Me()
        {
            var idStr = userManager.GetUserId(HttpContext.User);

            return int.TryParse(idStr, out var id) ? id : -1;
        }
    }
}
