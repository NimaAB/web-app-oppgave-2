using System.Collections.Generic;
using System.Threading.Tasks;
using Web_app_oppgave_2.Models;

namespace Web_app_oppgave_2.DAL.MealServices
{
    public interface IMealRepository
    {
        Task<List<Meal>> HentAlle();
        Task<bool> Oppdater(int id, Meal nyMeal);
        Task<bool> Slett(int id);
        Task<bool> Lagre(Meal meal);
    }
}