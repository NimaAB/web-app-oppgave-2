using System.Collections.Generic;
using System.Threading.Tasks;
using Web_app_oppgave_2.Models;

namespace Web_app_oppgave_2.DAL.LugarServices
{
    public interface ILugarRepository
    {
        Task<List<Lugar>> HentAlleLugar();
        Task<bool> OppdaterLugar(int id, Lugar nyLugar);
        Task<bool> SlettLugar(int id);
        Task<bool> LagreLugar(Lugar lugar);
    }
}