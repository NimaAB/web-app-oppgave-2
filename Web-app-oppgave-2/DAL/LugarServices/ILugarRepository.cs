using System.Collections.Generic;
using System.Threading.Tasks;
using Web_app_oppgave_2.Models;

namespace Web_app_oppgave_2.DAL.LugarServices
{
    public interface ILugarRepository
    {
        Task<List<Lugar>> HentAlle();
        Task<Lugar> HentEn(int id);
        Task<bool> Oppdater(int id, Lugar nyLugar);
        Task<bool> Slett(int id);
        Task<bool> Lagre(Lugar lugar);
    }
}