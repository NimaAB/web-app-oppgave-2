﻿using System.Threading.Tasks;
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
            var value = await _repo.HentAlle();
            return Ok(value);
        }

        // GET: api/lugar/1
        [HttpGet("{id}")]
        public async Task<IActionResult> HentLugar(int id)
        {
            var value = await _repo.HentEn(id);
            return Ok(value);
        }

        // PUT: api/lugar/oppdater/3
        [HttpPut("oppdater/{id}")]
        public async Task<IActionResult> OppdaterLugar(int id, Lugar lugar)
        {
            var value = await _repo.Oppdater(id, lugar);
            return !value 
                ? NotFound("Lugar du prøver å oppdater finnes ikke.")
                : StatusCode(200, "Lugar er oppdatert.");
        }

        // DELETE: api/lugar/slett/3
        [HttpDelete("slett/{id}")]
        public async Task<IActionResult> SlettLugar(int id)
        {
            var value = await _repo.Slett(id);
            return !value 
                ? NotFound("Lugar du prøver å slette finnes ikke.")
                : StatusCode(200, "Lugar er slettet.");
        }
        
        // POST: api/lugar/lagre
        [HttpPost("lagre")]
        public async Task<IActionResult> LagreLugar(Lugar lugar)
        {
            var value = await _repo.Lagre(lugar);
            return !value 
                ? BadRequest("Noe gikk galt. Lugar ble ikke lagret.")
                : StatusCode(200, "Ny lugar er lagret.");
        }
    }
}