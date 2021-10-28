using System.ComponentModel.DataAnnotations;

namespace Web_app_oppgave_2.Models
{
    public class Rute
    {
        [Key]
        public int RuteId { get; set; }
        public string Tur { get; set; }
        public byte[] Bilde { get; set; }
        public double Pris { get; set; }
    }
}
