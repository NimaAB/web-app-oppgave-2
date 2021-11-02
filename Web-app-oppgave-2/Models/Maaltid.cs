using System.ComponentModel.DataAnnotations;

namespace Web_app_oppgave_2.Models
{
    public class Maaltid
    {
        [Key]
        public int MaaltidId { get; set; }
        public string Navn { get; set; }
        public string Beskrivelse { get; set; }
        //public byte[] Bilde { get; set; }
        public double Pris { get; set; }
    }
}
