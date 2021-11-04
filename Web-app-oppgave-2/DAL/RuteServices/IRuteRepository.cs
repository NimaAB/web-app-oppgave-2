using System.Collections.Generic;
using System.Threading.Tasks;
using Web_app_oppgave_2.Models;

namespace Web_app_oppgave_2.DAL.RuteServices
{
    public interface IRuteRepository
    {
        Task<Rute> HentEn(int id);
        Task<List<Rute>> HentAlle();
        Task<bool> Oppdater(int id, Rute nyRute);
        Task<bool> Slett(int id);
        Task<bool> Lagre(Rute rute);
    }
}