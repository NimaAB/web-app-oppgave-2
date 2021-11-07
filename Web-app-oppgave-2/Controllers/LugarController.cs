using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Web_app_oppgave_2.DAL.LugarServices;
using Web_app_oppgave_2.Models;

namespace Web_app_oppgave_2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LugarController : ControllerBase
    {
        private readonly ILugarRepository _repo;
        private ILogger<LugarController> _log;
        private const string _loggetInnString = "LoggetInn";

        public LugarController(ILugarRepository repo, ILogger<LugarController> log)
        {
            _repo = repo;
            _log = log;
        }
        
        private bool ValidSession()
        {
            return !string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInnString));
        }

        // GET: api/lugar/hentAlle
        [HttpGet("hentAlle")]
        public async Task<IActionResult> HentAlleLugarer()
        {
            var value = await _repo.HentAlle();
            return Ok(value);
        }

        // GET: api/lugar/1
        [HttpGet("{id}")]
        public async Task<IActionResult> HentLugar(int id)
        {
            var value = await _repo.HentEn(id);
            if (value is null)
            {
                _log.LogInformation("Lugar ble ikke hentet!");
            }
            return Ok(value);
        }

        // PUT: api/lugar/oppdater/3
        [HttpPut("oppdater/{id}")]
        public async Task<IActionResult> OppdaterLugar(int id, Lugar lugar)
        {
            if (!ValidSession()) return Unauthorized();
            var value = await _repo.Oppdater(id, lugar);
            if (!value)
            {
                _log.LogInformation($"Lugar med id: {id} ble ikke endret!");
            }
            return !value 
                ? NotFound(new {error = "Lugar du prøver å oppdater finnes ikke."})
                : StatusCode(200,new {message =  "Lugar er oppdatert."});
        }

        // DELETE: api/lugar/slett/3
        [HttpDelete("slett/{id}")]
        public async Task<IActionResult> SlettLugar(int id)
        {
            if (!ValidSession()) return Unauthorized();
            var value = await _repo.Slett(id);
            if (!value)
            {
                _log.LogInformation("Lugar ble ikke slettet!");
            }
            return !value 
                ? NotFound(new {error = "Lugar du prøver å slette finnes ikke."})
                : StatusCode(200,new {message =  "Lugar er slettet."});
        }
        
        // POST: api/lugar/lagre
        [HttpPost("lagre")]
        public async Task<IActionResult> LagreLugar(Lugar lugar)
        {
            if (!ValidSession()) return Unauthorized();
            var value = await _repo.Lagre(lugar);
            if (!value)
            {
                _log.LogInformation("Lugar ble ikke lagret!");
            }
            return !value 
                ? BadRequest(new {error = "Noe gikk galt. Lugar ble ikke lagret."})
                : StatusCode(200, new {message = "Ny lugar er lagret."});
        }
    }
}
