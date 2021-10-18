using System.Threading.Tasks;
using Web_app_oppgave_2.Models;

namespace Web_app_oppgave_2.DAL.LugarServices
{
    public interface ILugarRepository
    {
        Task<bool> HentAlleLugar();
        Task<bool> OppdaterLugar(int id);
        Task<bool> SlettLugar(int id);
        Task<bool> LagreLugar(Lugar lugar);
    }
}