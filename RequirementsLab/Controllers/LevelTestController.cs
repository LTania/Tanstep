using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RequirementsLab.Core.Abstractions;
using RequirementsLab.Core.DTO.Test;
using RequirementsLab.Core.Entities;

namespace RequirementsLab.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LevelTestController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly ILevelTestService levelTestService;

        public LevelTestController(ILevelTestService levelTestService, UserManager<User> userManager)
        {
            this.levelTestService = levelTestService;
            this.userManager = userManager;
        }

        [HttpGet]
        [Route("Generate/")]
        public TestDTO Generate()
        {
            return levelTestService.Generate();
        }

        [HttpPost]
        [Route("Check/")]
        public TestResultDTO Check([FromBody] TestAnswersDTO answers)
        {
            return levelTestService.Check(answers, Me());
        }

        private int Me()
        {
            var idStr = userManager.GetUserId(HttpContext.User);

            return int.TryParse(idStr, out var id) ? id : -1;
        }
    }
}
