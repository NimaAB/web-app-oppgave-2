using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
            return _db.Lugarer.ToList();
        }

        public async Task<bool> OppdaterLugar(Lugar nyLugar)
        {
            throw new System.NotImplementedException();
        }

        public async Task<bool> SlettLugar(int id)
        {
            try
            {
                var lugar = await _db.Lugarer.FindAsync(id);
                if (lugar == null) return false;
                _db.Lugarer.Remove(lugar);
                _db.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> LagreLugar(Lugar lugar)
        {
            throw new System.NotImplementedException();
        }
    }
}