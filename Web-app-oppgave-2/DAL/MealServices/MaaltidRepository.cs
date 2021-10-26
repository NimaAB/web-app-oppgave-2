using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Web_app_oppgave_2.Models;

namespace Web_app_oppgave_2.DAL.MealServices
{
    public class MaaltidRepository : IMaaltidRepository
    {
        private readonly Db _db;

        public MaaltidRepository(Db db)
        {
            _db = db;
        }

        public async Task<List<Maaltid>> HentAlle()
        {
            return await _db.Maaltider.ToListAsync();
        }

        public async Task<bool> Oppdater(int id, Maaltid nyMaaltid)
        {
            try
            {
                var meal = await _db.Maaltider.FindAsync(id);
                if (meal == null) return false;
                meal.Navn = nyMaaltid.Navn;
                meal.Beskrivelse = nyMaaltid.Beskrivelse;
                meal.Pris = nyMaaltid.Pris;
                
                _db.Maaltider.Update(meal);
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
                var meal = await _db.Maaltider.FindAsync(id);
                if (meal == null) return false;
                _db.Maaltider.Remove(meal);
                await _db.SaveChangesAsync();
                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> Lagre(Maaltid maaltid)
        {
            try
            {
                if (maaltid.Navn is null || maaltid.Beskrivelse is null || maaltid.Pris <= 0) return false;
                await _db.Maaltider.AddAsync(maaltid);
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