using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Web_app_oppgave_2.DAL.LugarServices;
using Web_app_oppgave_2.Models;

namespace Web_app_oppgave_2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LugarController : ControllerBase
    {
        private readonly ILugarRepository _repo;

        public LugarController(ILugarRepository repo)
        {
            _repo = repo;
        }

        // GET: api/lugar
        [HttpGet]
        public async Task<IActionResult> HentAlleLugarer()
        {
            var value = await _repo.HentAlleLugar();
            return Ok(value);
        }

        // POST: api/lugar/oppdater/3
        [HttpPost("oppdater/{id}")]
        public async Task<IActionResult> OppdaterLugar(int id, Lugar lugar)
        {
            var value = await _repo.OppdaterLugar(id, lugar);
            if (!value) return NotFound("Lugar du prøver å oppdater finnes ikke.");
            return StatusCode(200, "Lugar er oppdatert.");
        }

        // POST: api/lugar/slett/3
        [HttpPost("slett/{id}")]
        public async Task<IActionResult> SlettLugar(int id)
        {
            var value = await _repo.SlettLugar(id);
            if (!value) return NotFound("Lugar du prøver å slette finnes ikke.");
            return StatusCode(200, "Lugar er slettet.");
        }
        
        // POST: api/lugar/lagre
        [HttpPost("lagre")]
        public async Task<IActionResult> LagreLugar(Lugar lugar)
        {
            var value = await _repo.LagreLugar(lugar);
            if (!value) return BadRequest("Noe gikk galt. Lugar ble ikke lagret.");
            return StatusCode(200, "Lugar er lagret.");
        }
    }
}
