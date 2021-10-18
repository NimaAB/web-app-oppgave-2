using System;

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