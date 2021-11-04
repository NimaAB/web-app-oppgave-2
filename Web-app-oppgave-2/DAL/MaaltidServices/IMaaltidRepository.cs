using System.Collections.Generic;
using System.Threading.Tasks;
using Web_app_oppgave_2.Models;

namespace Web_app_oppgave_2.DAL.MaaltidServices
{
    public interface IMaaltidRepository
    {
        Task<Maaltid> HentEn(int id);
        Task<List<Maaltid>> HentAlle();
        Task<bool> Oppdater(int id, Maaltid nyMaaltid);
        Task<bool> Slett(int id);
        Task<bool> Lagre(Maaltid maaltid);
    }
}