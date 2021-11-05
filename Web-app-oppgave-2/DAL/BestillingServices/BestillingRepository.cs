using System.Collections.Generic;
using System.Linq;
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

                var billettTur = new BillettRute()
                {
                    Billett = bestilling.Billetter.ElementAt(0),
                    Rute = bestilling.Billetter.ElementAt(0).Tur.Rute,
                    Tid = bestilling.Billetter.ElementAt(0).Utreise
                };
                BillettRute billettRetur= null;
                if (bestilling.Billetter.ElementAt(0).Tur.Rute != null)
                {
                    billettRetur.Billett = bestilling.Billetter.ElementAt(0);
                    billettRetur.Rute = bestilling.Billetter.ElementAt(0).Retur.Rute;
                    billettRetur.Tid = bestilling.Billetter.ElementAt(0).Utreise;
                }
                
                
                var nyeBilletter = new List<Billett>();
                bestilling.Billetter.ForEach(billett =>
                {
                    nyeBilletter.Add(new Billett()
                    {
                        Type = billett.Type,
                        Tur = billettTur,
                        Retur = billettRetur,
                        Utreise = billett.Utreise,
                        Ankomst = billett.Ankomst,
                        Passasjer = billett.Passasjer,
                        AntallSykler = billett.AntallSykler,
                        Kjæledyr = billett.Kjæledyr
                    });
                });

                var lugarbestillinger = new List<LugarBestilling>();
                bestilling.Lugarer.ForEach(lugar =>
                {
                    lugarbestillinger.Add(new LugarBestilling()
                    {
                        Lugar = lugar.Lugar,
                        Bestilling = bestilling,
                        Tid = bestilling.Billetter.ElementAt(0).Utreise
                    });
                });

                var maaltidBestillinger = new List<MaaltidBestilling>();
                bestilling.Maaltider.ForEach( maaltid =>
                {
                    maaltidBestillinger.Add(new MaaltidBestilling()
                    {
                        Maaltid = maaltid.Maaltid,
                        Bestilling = bestilling,
                        Tid = bestilling.Billetter.ElementAt(0).Utreise
                    });
                });

                var nyBestilling = new Bestilling()
                {
                    Kunde = nyKunde,
                    Billetter = nyeBilletter,
                    Lugarer = lugarbestillinger,
                    Maaltider = maaltidBestillinger,
                    TotalPris = bestilling.TotalPris
                };

                _db.Bestillinger.Add(nyBestilling);
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
