using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Web_app_oppgave_2.Models;

namespace Web_app_oppgave_2.DAL.MealServices
{
    public class MealRepository : IMealRepository
    {
        private readonly Db _db;

        public MealRepository(Db db)
        {
            _db = db;
        }

        public async Task<List<Meal>> HentAlle()
        {
            return await _db.Meals.ToListAsync();
        }

        public async Task<bool> Oppdater(int id, Meal nyMeal)
        {
            try
            {
                var meal = await _db.Meals.FindAsync(id);
                if (meal == null) return false;
                meal.Maaltid = nyMeal.Maaltid;
                meal.Beskrivelse = nyMeal.Beskrivelse;
                meal.Pris = nyMeal.Pris;
                
                _db.Meals.Update(meal);
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> Slett(int id)
        {
            try
            {
                var meal = await _db.Meals.FindAsync(id);
                if (meal == null) return false;
                _db.Meals.Remove(meal);
                await _db.SaveChangesAsync();
                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> Lagre(Meal meal)
        {
            try
            {
                if (meal.Maaltid is null || meal.Beskrivelse is null || meal.Pris <= 0) return false;
                await _db.Meals.AddAsync(meal);
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}