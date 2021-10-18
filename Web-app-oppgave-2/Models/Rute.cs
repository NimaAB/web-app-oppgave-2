using System.ComponentModel.DataAnnotations;

namespace Web_app_oppgave_2.Models
{
    public class Rute
    {
        [Key]
        public int RuteID { get; set; }
        public string Tur { get; set; }
        public double Pris { get; set; }
        //public virtual Billett Billett { get; set; }
    }
}
