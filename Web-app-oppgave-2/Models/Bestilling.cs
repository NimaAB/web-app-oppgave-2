using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using WebAppOppgave1.Models;

namespace Web_app_oppgave_2.Models
{
    public class Bestilling
    {
        [Key]
        public int BestillingNummer { get; set; }
        public virtual Kunde Kunde { get; set; }
        public virtual List<Billett> Billetter { get; set; }
        public virtual List<LugarBestilling> Lugars { get; set; }
        public virtual List<MealBestilling> Meals { get; set; }
        public double TotalPris { get; set; }
    }
}
