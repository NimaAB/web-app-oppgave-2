using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Web_app_oppgave_2.DAL.BestillingServices;
using Web_app_oppgave_2.Models;

namespace Web_app_oppgave_2.Controllers
{
    [Route("[controller]/[action]")]
    public class BestillingController : ControllerBase
    {
        private readonly IBestillingRepository _db;

        public BestillingController(IBestillingRepository db)
        {
            _db = db;
        }

        public async Task<bool> Lagre(Bestilling innBestilling)
        {
            bool saved = await _db.Lagre(innBestilling);
            return saved;
        }
    }
}
