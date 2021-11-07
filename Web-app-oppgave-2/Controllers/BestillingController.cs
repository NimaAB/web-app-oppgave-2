using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Web_app_oppgave_2.DAL.BestillingServices;
using Web_app_oppgave_2.Models;

namespace Web_app_oppgave_2.Controllers
{
    [Route("[controller]/[action]")]
    public class BestillingController : ControllerBase
    {
        private readonly IBestillingRepository _repo;
        private ILogger<BestillingController> _log;
        public BestillingController(IBestillingRepository repo, ILogger<BestillingController> log)
        {
            _repo = repo;
            _log = log;
        }

        public async Task<IActionResult> Lagre(Bestilling innBestilling)
        {
            var value = await _repo.Lagre(innBestilling);
            if (!value)
            {
                _log.LogInformation("Bestilling lagring gikk ikke!");
            }
            return !value
                ? BadRequest(new {error = "Noe gikk galt. Bestillingen ble ikke lagret."})
                : StatusCode(200, new {message = "Ny bestilling er lagret."});
        }
    }
}
