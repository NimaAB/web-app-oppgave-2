using System;
using System.ComponentModel.DataAnnotations;
using System.Net.Mime;

namespace Web_app_oppgave_2.Models
{
    public class Lugar
    {
        [Key]
        public int LugarId { get; set; }
        public string Type { get; set; }
        public string Navn { get; set; }
        public int Kapasitet { get; set; }
        public string Beskrivelse { get; set; }
        public int MaxReservasjon { get; set; }
        //public MediaTypeNames.Image Bilde { get; set; }
        public double Pris { get; set; }
    }
}
