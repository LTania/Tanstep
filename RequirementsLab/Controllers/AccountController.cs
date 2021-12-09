using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RequirementsLab.Core.Abstractions;
using RequirementsLab.Core.DTO.Account;
using RequirementsLab.Core.Entities;
using System;
using System.Threading.Tasks;

namespace RequirementsLab.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService accountService;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, IAccountService accountService)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.accountService = accountService;
        }

        [HttpPost]
        [Route("Login/")]
        public async Task<int> Login([FromBody] LoginDTO loginData)
        {
            var username = loginData.UserName;
            var password = loginData.Password;

            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                throw new ArgumentException("Пароль або логін порожній.");
            }

            var user = await userManager.FindByNameAsync(username);

            if (user != null)
            {
                var result = await signInManager.PasswordSignInAsync(username, password, false, false);

                if (result.Succeeded)
                {
                    return user.Id;
                }
                else
                {
                    throw new ArgumentException("Не правильний пароль.");
                }
            }
            else
            {
                throw new ArgumentException("Користувача з таким логіном не знайдено.");
            }
        }

        [HttpPost]
        [Route("Logout/")]
        public async Task<IActionResult> LogOut()
        {
            await signInManager.SignOutAsync();

            return Ok();
        }

        [HttpPost]
        [Route("Register/")]
        public async Task<IActionResult> Register([FromBody]RegisterDTO registerData)
        {
            var username = registerData.UserName;
            var password = registerData.Password;
            var name = registerData.Name;
            var surname = registerData.Surname;

            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                throw new ArgumentException("Пароль або логін порожній.");
            }

            var user = new User
            {
                Level = -1f,
                Name = name,
                Surname = surname,
                UserName = username,
            };

            var result = await userManager.CreateAsync(user, password);

            if (result.Succeeded)
            {
                await signInManager.PasswordSignInAsync(username, password, false, false);

                return Ok(GetByLogin(user.UserName).Result.Id);
            }

            return BadRequest();
        }

        [HttpGet]
        [Route("Me/")]
        public UserStateDTO Me()
        {
            var idStr = userManager.GetUserId(HttpContext.User);
            var idInt = int.TryParse(idStr, out var id) ? id : -1;

            return accountService.UserState(idInt);
        }

        private async Task<User> GetByLogin(string login)
        {
            return await userManager.FindByNameAsync(login);
        }
    }
}
