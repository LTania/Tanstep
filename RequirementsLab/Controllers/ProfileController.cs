using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RequirementsLab.Core.Abstractions;
using RequirementsLab.Core.DTO.Tasks;
using RequirementsLab.Core.Entities;

namespace RequirementsLab.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly IResultsService resultsService;
        private readonly UserManager<User> userManager;
        public ProfileController(IResultsService resultsService, UserManager<User> userManager)
        {
            this.resultsService = resultsService;
            this.userManager = userManager;
        }

        [HttpGet]
        [Route("profile/")]
        public dynamic GetResults()
        {
            return resultsService.GetResults(Me());
        }

        private int Me()
        {
            var idStr = userManager.GetUserId(HttpContext.User);

            return int.TryParse(idStr, out var id) ? id : -1;
        }
    }
}
