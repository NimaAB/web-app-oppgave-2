using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Web_app_oppgave_2.DAL.LoggInnServices;
using Web_app_oppgave_2.Models;

namespace Web_app_oppgave_2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ILoginRepository _repo;
        private Logger<LoginController> _log;
        private const string _loggetInnString = "LoggetInn";

        public LoginController(ILoginRepository repo, Logger<LoginController> log)
        {
            _repo = repo;
            _log = log;
        }

        [HttpPost]
        public async Task<IActionResult> Login(BrukerDto bruker)
        {
            var value = await _repo.LoggInn(bruker);
            if (!value)
            {
                _log.LogInformation("Ugyldig bruker informasjon");
            }

            if (!value)
            {
                HttpContext.Session.SetString(_loggetInnString, "");
                return BadRequest(new {error = "Unauthorized"});
            }
            HttpContext.Session.SetString(_loggetInnString, "LoggetInn");
            return StatusCode(200, new {message = "Logg inn vellykket."});
        }

        [HttpGet("loggut")]
        public void Logout()
        {
            HttpContext.Session.SetString(_loggetInnString, "");
            Redirect("/kunde.html");
        }
    }
}