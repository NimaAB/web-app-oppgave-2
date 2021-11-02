using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Web_app_oppgave_2.Models
{
    public class Bestilling
    {
        [Key]
        public int BestillingId { get; set; }
        public virtual Kunde Kunde { get; set; }
        public virtual List<Billett> Billetter { get; set; }
        public virtual List<LugarBestilling> Lugarer { get; set; }
        public virtual List<MaaltidBestilling> Maaltider { get; set; }
        public double TotalPris { get; set; }
    }
}
