using System;
using Web_app_oppgave_2.Models;
using System.ComponentModel.DataAnnotations;

namespace WebAppOppgave1.Models
{
    public class MealBestilling
    {
        [Key]
        public int MBid { get; set; } 
        public virtual Meal Meal { get; set; }
        public virtual Bestilling Bestilling { get; set; }
        public DateTime Tid { get; set; }
    }
}