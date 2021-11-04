using System.Threading.Tasks;
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

        public LoginController(ILoginRepository repo)
        {
            _repo = repo;
        }

        [HttpPost]
        public async Task<IActionResult> Login(BrukerDto bruker)
        {
            var value = await _repo.LoggInn(bruker);
            return !value 
                ? BadRequest(new {error = "Unauthorized"})
                : StatusCode(200, new {message = "Logg inn vellykket."});
        }
    }
}