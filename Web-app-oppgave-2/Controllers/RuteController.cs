using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Web_app_oppgave_2.DAL.MealServices;
using Web_app_oppgave_2.DAL.RuteServices;
using Web_app_oppgave_2.Models;

namespace Web_app_oppgave_2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RuteController : ControllerBase
    {
        private readonly IRuteRepository _repo;

        public RuteController(IRuteRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> HentAlleRuter()
        {
            var value = _repo.HentAlle();
            return Ok(value);
        }

        [HttpPut("oppdater/{id}")]
        public async Task<IActionResult> OppdaterRute(int id, Rute nyRute)
        {
            var value = await _repo.Oppdater(id, nyRute);
            return !value 
                ? NotFound("Ruten du prøver å oppdatere finnes ikke.") 
                : StatusCode(200, "Ruten er oppdatert.");
        }

        [HttpDelete("slett/{id}")]
        public async Task<IActionResult> SlettRute(int id)
        {
            var value = await _repo.Slett(id);
            return !value
                ? NotFound("Ruten du prøver å slette finnes ikke.")
                : StatusCode(200,"Ruten er slettet");
        }

        [HttpPost("lagre")]
        public async Task<IActionResult> LagreRute(Rute rute)
        {
            var value = await _repo.Lagre(rute);
            return !value
                ? BadRequest("Noe gikk galt! Ny rute ble ikke lagret.")
                : StatusCode(200, "Ny rute er lagret.");
        }
    }
}