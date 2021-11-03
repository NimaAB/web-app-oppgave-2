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
        private readonly IBestillingRepository _db;
        private ILogger<BestillingController> _log;

        public BestillingController(IBestillingRepository db, ILogger<BestillingController> log)
        {
            _db = db;
            _log = log;
        }

        public async Task<bool> Lagre(Bestilling innBestilling)
        {
            bool saved = await _db.Lagre(innBestilling);
            return saved;
        }
    }
}
