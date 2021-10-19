using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Web_app_oppgave_2.Models;

namespace Web_app_oppgave_2.DAL.LugarServices
{
    public class LugarRepository : ILugarRepository
    {
        //metodene mangler logger for nå, vi implementer det i stage 3.
        private readonly Db _db;
        
        public LugarRepository(Db db)
        {
            _db = db;
        }
        
        public async Task<List<Lugar>> HentAlleLugar()
        {
            var lugarer = await _db.Lugarer.ToListAsync();
            return lugarer;
        }

        public async Task<bool> OppdaterLugar(int id, Lugar nyLugar)
        {
            var lugar = await _db.Lugarer.FindAsync(id);
            if (lugar == null) return false;

            lugar.Type = nyLugar.Type;
            lugar.Beskrivelse = nyLugar.Beskrivelse;
            lugar.Pris = nyLugar.Pris;
            
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> SlettLugar(int id)
        {
            var lugar = await _db.Lugarer.FindAsync(id);
            if (lugar == null) return false;
            _db.Lugarer.Remove(lugar);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> LagreLugar(Lugar lugar)
        {
            if (lugar.Type is null || lugar.Beskrivelse is null || lugar.Pris <= 0) return false;
            await _db.Lugarer.AddAsync(lugar);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}