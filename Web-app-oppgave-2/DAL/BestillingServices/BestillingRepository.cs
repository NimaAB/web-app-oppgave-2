using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Web_app_oppgave_2.Models;

namespace Web_app_oppgave_2.DAL.BestillingServices
{
    public class BestillingRepository : IBestillingRepository
    {
        private readonly Db _db;
        public BestillingRepository(Db db)
        {
            _db = db;
        }

        public async Task<List<Bestilling>> HentAlle()
        {
            return await _db.Bestillinger.ToListAsync();
        }

        public async Task<bool> Oppdater(int id,Bestilling nyBestilling)
        {
            throw new System.NotImplementedException();
        }

        public async Task<bool> Slett(int id)
        {
            throw new System.NotImplementedException();
        }
        
        public async Task<bool> Lagre(Bestilling bestilling)
        {
            try
            {
                var nyKunde = new Kunde();
                nyKunde.Fornavn = bestilling.Kunde.Fornavn;
                nyKunde.Etternavn = bestilling.Kunde.Etternavn;
                nyKunde.Tlfnummer = bestilling.Kunde.Tlfnummer;
                nyKunde.Adresse = bestilling.Kunde.Adresse;
                nyKunde.Epost = bestilling.Kunde.Epost;
                var sjekketPostnr = await _db.Poststeder.FindAsync(bestilling.Kunde.Postnummer.Postnr);
                if (sjekketPostnr == null)
                {
                    var nyPoststedRecord = new Postnummer()
                    {
                        Postnr = bestilling.Kunde.Postnummer.Postnr,
                        Poststed = bestilling.Kunde.Postnummer.Poststed
                    };
                    nyKunde.Postnummer = nyPoststedRecord;
                }
                else
                {
                    nyKunde.Postnummer = sjekketPostnr;
                }

                //var lugarbestillinger = new LugarBestilling();
                
                return true;
            }
            catch
            {
                return false;
            }
        }

        /*public async Task<bool> LagreBestilling(Bestilling innBestilling)
        {
                var nyeBilletter = new List<Billett>();
                innBestilling.Billetter.ForEach(billett =>
                {
                    nyeBilletter.Add(new Billett()
                    {
                        Type = billett.Type,
                        Tur = billett.Tur,
                        Retur = billett.Retur,
                        Utreise = billett.Utreise,
                        Ankomst = billett.Ankomst,
                        Passasjer = billett.Passasjer
                    });
                });
                
                var lugarer = innBestilling.Lugars;
                var meals = innBestilling.Meals;

                var bestilling = new Bestilling()
                {
                    Kunde = nyKunde,
                    Billetter = nyeBilletter,
                    Lugars = lugarer,
                    Meals = meals,
                    TotalPris = innBestilling.TotalPris
                };
                
                _db.Bestillinger.Add(bestilling);
                await _db.SaveChangesAsync();
                
                return true;
            }
            catch
            {
                return false;
            }
        }*/
    }
}
