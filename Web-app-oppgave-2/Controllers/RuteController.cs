using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Web_app_oppgave_2.DAL.RuteServices;
using Web_app_oppgave_2.Models;

namespace Web_app_oppgave_2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RuteController : ControllerBase
    {
        private readonly IRuteRepository _repo;
        private Logger<RuteController> _log;
        private const string _loggetInnString = "LoggetInn";

        public RuteController(IRuteRepository repo, Logger<RuteController> log)
        {
            _repo = repo;
            _log = log;
        }

        private bool ValidSession()
        {
            return !string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInnString));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> HentEnRute(int id)
        {
            var value = await _repo.HentEn(id);
            if (value == null)
            {
                _log.LogInformation("Rute fantes ikke");
            }
            return Ok(value);
        }

        [HttpGet("hentAlle")]
        public async Task<IActionResult> HentAlleRuter()
        {
            var value = await _repo.HentAlle();
            return Ok(value);
        }

        [HttpPut("oppdater/{id}")]
        public async Task<IActionResult> OppdaterRute(int id, Rute nyRute)
        {
            if (!ValidSession()) return Unauthorized();
            var value = await _repo.Oppdater(id, nyRute);
            if (!value)
            {
                _log.LogInformation("Rute kunne ikke oppdateres");
            }
            return !value 
                ? NotFound(new { error = "Ruten du prøver å oppdatere finnes ikke."}) 
                : StatusCode(200, new { message = "Ruten er oppdatert." });
        }

        [HttpDelete("slett/{id}")]
        public async Task<IActionResult> SlettRute(int id)
        {
            if (!ValidSession()) return Unauthorized();
            var value = await _repo.Slett(id);
            if (!value)
            {
                _log.LogInformation("Rute kunne ikke slettes");
            }
            return !value
                ? NotFound(new { error = "Ruten du prøver å slette finnes ikke."})
                : StatusCode(200,new { message = "Ruten er slettet." });
        }

        [HttpPost("lagre")]
        public async Task<IActionResult> LagreRute(Rute rute)
        {
            if (!ValidSession()) return Unauthorized();
            var value = await _repo.Lagre(rute);
            if (!value)
            {
                _log.LogInformation("Rute kunne ikke lagres");
            }
            return !value
                ? BadRequest()
                : StatusCode(200, new { message = "Ruten er lagret" });
        }
    }
}