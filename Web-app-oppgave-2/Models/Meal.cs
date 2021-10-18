using System.ComponentModel.DataAnnotations;

namespace Web_app_oppgave_2.Models
{
    public class Meal
    {
        [Key]
        public int MealsNummer { get; set; }
        public string Maaltid { get; set; }
        public double Pris { get; set; }
        public virtual Bestilling Bestilling { get; set; }
    }
}
