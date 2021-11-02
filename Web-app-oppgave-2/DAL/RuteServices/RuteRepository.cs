using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Web_app_oppgave_2.Models;

namespace Web_app_oppgave_2.DAL.RuteServices
{
    public class RuteRepository : IRuteRepository
    {
        private readonly Db _db;

        public RuteRepository(Db db)
        {
            _db = db;
        }
        
        public async Task<List<Rute>> HentAlle()
        {
            return await _db.Ruter.ToListAsync();
        }

        public async Task<bool> Oppdater(int id, Rute nyRute)
        {
            try
            {
                var rute = await _db.Ruter.FindAsync(id);
                if (rute == null) return false;
                rute.Tur = nyRute.Tur;
                //rute.Bilde = nyRute.Bilde;
                rute.Pris = nyRute.Pris;
                _db.Ruter.Update(rute);
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
                var rute = await _db.Ruter.FindAsync(id);
                if (rute == null) return false;
                _db.Ruter.Remove(rute);
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> Lagre(Rute rute)
        {
            try
            {
                //||rute.Bilde.Length == 0 
                if (rute.Tur is null
                    || rute.Pris <= 0) return false;
                await _db.Ruter.AddAsync(rute);
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