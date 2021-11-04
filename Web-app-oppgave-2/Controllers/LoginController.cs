using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Web_app_oppgave_2.DAL.LoggInnServices;
using Web_app_oppgave_2.Models;

namespace Web_app_oppgave_2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ILoginRepository _repo;
        private const string _loggetInnString = "LoggetInn";

        public LoginController(ILoginRepository repo)
        {
            _repo = repo;
        }

        [HttpPost]
        public async Task<IActionResult> Login(BrukerDto bruker)
        {
            var value = await _repo.LoggInn(bruker);

            if (!value)
            {
                HttpContext.Session.SetString(_loggetInnString, "");
                return BadRequest(new {error = "Unauthorized"});
            }
            HttpContext.Session.SetString(_loggetInnString, "LoggetInn");
            return StatusCode(200, new {message = "Logg inn vellykket."});
        }

        [HttpPost("false")]
        public void Logout()
        {
            HttpContext.Session.SetString(_loggetInnString, "");
        }
    }
}