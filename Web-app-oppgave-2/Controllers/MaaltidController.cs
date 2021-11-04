using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Web_app_oppgave_2.DAL.MaaltidServices;
using Web_app_oppgave_2.Models;

namespace Web_app_oppgave_2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MaaltidController : ControllerBase
    {
        private readonly IMaaltidRepository _repo;
        private const string _loggetInnString = "LoggetInn";

        public MaaltidController(IMaaltidRepository repo)
        {
            _repo = repo;
        }
        
        private bool ValidSession()
        {
            return !string.IsNullOrEmpty(HttpContext.Session.GetString(_loggetInnString));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> HentEnMaaltid(int id)
        {
            var value = await _repo.HentEn(id);
            return Ok(value);
        }

        [HttpGet("hentAlle")]
        public async Task<IActionResult> HentAlleMaaltider()
        {
            var value = await _repo.HentAlle();
            return Ok(value);
        }

        [HttpPut("oppdater/{id}")]
        public async Task<IActionResult> OppdaterMaaltid(int id, Maaltid nyMaaltid)
        {
            if (!ValidSession()) return Unauthorized();
            var value = await _repo.Oppdater(id, nyMaaltid);
            return !value 
                ? NotFound(new { error = "Måltiden du prøver å oppdatere finnes ikke." })
                : StatusCode(200, new { message = "Måltid er oppdatert" });
        }

        [HttpDelete("slett/{id}")]
        public async Task<IActionResult> SlettMaaltid(int id)
        {
            if (!ValidSession()) return Unauthorized();
            var value = await _repo.Slett(id);
            return !value
                ? NotFound(new { error = "Måltiden du prøver å slette finnes ikke." })
                : StatusCode(200, new { message =  "Måltid er slettet" });
        }

        [HttpPost("lagre")]
        public async Task<IActionResult> LagreMaaltid(Maaltid maaltid)
        {
            if (!ValidSession()) return Unauthorized();
            var value = await _repo.Lagre(maaltid);
            return !value
                ? BadRequest(new { error = "Noe gikk galt. Måltid ble ikke lagret" })
                : StatusCode(200, new { message = "Ny måltid er lagret." });
        }
        
    }
}