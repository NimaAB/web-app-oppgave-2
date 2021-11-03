using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Web_app_oppgave_2.DAL.BestillingServices;
using Web_app_oppgave_2.Models;

namespace Web_app_oppgave_2.Controllers
{
    [Route("[controller]/[action]")]
    public class BestillingController : ControllerBase
    {
        private readonly IBestillingRepository _repo;

        public BestillingController(IBestillingRepository repo)
        {
            _repo = repo;
        }

        public async Task<IActionResult> Lagre(Bestilling innBestilling)
        {
            var value = await _repo.Lagre(innBestilling);
            return !value
                ? BadRequest(new {error = "Noe gikk galt. Bestillingen ble ikke lagret."})
                : StatusCode(200, new {message = "Ny bestilling er lagret."});
        }
    }
}
