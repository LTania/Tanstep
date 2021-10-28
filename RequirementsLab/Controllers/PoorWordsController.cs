using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RequirementsLab.Core.Abstractions;
using RequirementsLab.Core.DTO.PoorWords;
using RequirementsLab.Core.Entities;

namespace RequirementsLab.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PoorWordsController : ControllerBase
    {
        private readonly IPoorWordsService pwService;
        private readonly IResultsService resultsService;
        private readonly UserManager<User> userManager;
        public PoorWordsController(IPoorWordsService pwService, IResultsService resultsService, UserManager<User> userManager)
        {
            this.pwService = pwService;
            this.resultsService = resultsService;
            this.userManager = userManager;
        }

        [HttpPost]
        [Route("Check/")]
        public PoorWordsResultDTO CheckPoorWords([FromBody] PoorWordsRequestDTO poorWords)
        {
            var result = pwService.CheckPoorWords(poorWords);
            resultsService.StoreResult(poorWords.taskId, result.Grade, Me());

            return result;
        }

        [HttpGet]
        [Route("GetRequirementsForPWTask/{id}")]
        public RequirementsForPWTaskDTO GetRequirements([FromRoute] int id)
        {
            return pwService.GetRequirements(id);
        }

        private int Me()
        {
            var idStr = userManager.GetUserId(HttpContext.User);

            return int.TryParse(idStr, out var id) ? id : -1;
        }
    }
}
