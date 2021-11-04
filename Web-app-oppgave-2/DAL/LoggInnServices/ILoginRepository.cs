using System.Threading.Tasks;
using Web_app_oppgave_2.Models;

namespace Web_app_oppgave_2.DAL.LoggInnServices
{
    public interface ILoginRepository
    {
        Task<bool> LoggInn(BrukerDto brukerDto);
    }
}