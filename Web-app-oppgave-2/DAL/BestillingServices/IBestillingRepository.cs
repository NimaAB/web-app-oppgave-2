using System.Threading.Tasks;
using Web_app_oppgave_2.Models;

namespace Web_app_oppgave_2.DAL.BestillingServices
{
    public interface IBestillingRepository
    {
        Task<bool> HentAlleBestilling();
        Task<bool> OppdaterBestilling(int id);
        Task<bool> SlettBestilling(int id);
        Task<bool> LagreBestilling(Bestilling innBestilling);
    }
}
