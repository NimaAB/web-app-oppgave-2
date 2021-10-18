using System;
using System.ComponentModel.DataAnnotations;
using System.Net.Mime;

namespace Web_app_oppgave_2.Models
{
    public class Lugar
    {
        [Key]
        public int LugarNummer { get; set; }
        public string Type { get; set; }
        public string Beskrivelse { get; set; }
        //public MediaTypeNames.Image Bilde { get; set; }
        public double Pris { get; set; }
    }
}
