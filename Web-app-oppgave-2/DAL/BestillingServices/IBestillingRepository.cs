using System.Collections.Generic;
using System.Threading.Tasks;
using Web_app_oppgave_2.Models;

namespace Web_app_oppgave_2.DAL.BestillingServices
{
    public interface IBestillingRepository
    {
        Task<List<Bestilling>> HentAlle();
        Task<bool> Oppdater(int id, Bestilling nyBestilling);
        Task<bool> Slett(int id);
        Task<bool> Lagre(Bestilling innBestilling);
    }
}
