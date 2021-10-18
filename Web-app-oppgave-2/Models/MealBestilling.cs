using System;
using Web_app_oppgave_2.Models;

namespace WebAppOppgave1.Models
{
    public class MealBestilling
    {
        public int MBid { get; set; } 
        public virtual Meal Meal { get; set; }
        public virtual Bestilling Bestilling { get; set; }
        public DateTime Tid { get; set; }
    }
}