using System.ComponentModel.DataAnnotations;

namespace Web_app_oppgave_2.Models
{
    public class Lugar
    {
        [Key]
        public int LugarNummer { get; set; }
        public string Type { get; set; }
        public double Pris { get; set; }
        public virtual Bestilling Bestilling { get; set; }
    }
}
