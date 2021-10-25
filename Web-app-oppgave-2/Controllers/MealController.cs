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

        [HttpPost("oppdater/{id}")]
        public async Task<IActionResult> OppdaterMeal(int id, Meal nyMeal)
        {
            var value = await _repo.Oppdater(id, nyMeal);
            return !value ? NotFound("Måltiden du prøver å oppdatere finnes ikke.")
                : StatusCode(200, "Måltid er oppdatert");
        }
    }
}