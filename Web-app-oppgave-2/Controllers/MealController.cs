using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Web_app_oppgave_2.DAL.MealServices;
using Web_app_oppgave_2.Models;

namespace Web_app_oppgave_2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MealController:ControllerBase
    {
        private readonly IMealRepository _repo;

        public MealController(IMealRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> HentAlleMeals()
        {
            var value = _repo.HentAlle();
            return Ok(value);
        }

        [HttpPut("oppdater/{id}")]
        public async Task<IActionResult> OppdaterMeal(int id, Meal nyMeal)
        {
            var value = await _repo.Oppdater(id, nyMeal);
            return !value ? NotFound("Måltiden du prøver å oppdatere finnes ikke.")
                : StatusCode(200, "Måltid er oppdatert");
        }

        [HttpDelete("slett/{id}")]
        public async Task<IActionResult> SlettMeal(int id)
        {
            var value = await _repo.Slett(id);
            return !value
                ? NotFound("Måltiden du prøver å oppdatere finnes ikke.")
                : StatusCode(200, "Måltid er slettet");
        }

        [HttpPost("lagre")]
        public async Task<IActionResult> LagreMeal(Meal meal)
        {
            var value = await _repo.Lagre(meal);
            return !value
                ? BadRequest("Noe gikk galt. Måltid ble ikke lagret")
                : StatusCode(200, "Ny måltid er lagret.");
        }
        
    }
}