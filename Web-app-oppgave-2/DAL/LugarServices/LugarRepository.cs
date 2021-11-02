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
        
        public async Task<List<Lugar>> HentAlle()
        {
            return await _db.Lugarer.ToListAsync();
        }

        public async Task<Lugar> HentEn(int id)
        {
            return await _db.Lugarer.FindAsync(id);
        }

        public async Task<bool> Oppdater(int id, Lugar nyLugar)
        {
            try
            {
                var lugar = await _db.Lugarer.FindAsync(id);
                if (lugar == null) return false;
                
                lugar.Type = nyLugar.Type;
                //lugar.Bilde = nyLugar.Bilde;
                lugar.Navn = nyLugar.Navn;
                lugar.Kapasitet = nyLugar.Kapasitet;
                lugar.Beskrivelse = nyLugar.Beskrivelse;
                lugar.MaxReservasjon = nyLugar.MaxReservasjon;
                lugar.Pris = nyLugar.Pris;
                
                _db.Lugarer.Update(lugar);
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
                var lugar = await _db.Lugarer.FindAsync(id);
                if (lugar == null) return false;
                _db.Lugarer.Remove(lugar);
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
            
        }

        public async Task<bool> Lagre(Lugar lugar)
        {
            try
            {
                //|| lugar.Bilde.Length == 0
                if (lugar.Type is null
                    || lugar.Beskrivelse is null
                    || lugar.Pris <= 0) return false;
                await _db.Lugarer.AddAsync(lugar);
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