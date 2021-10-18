using System;
using System.ComponentModel.DataAnnotations;

namespace Web_app_oppgave_2.Models
{
    public class Passasjer
    {
        [Key]
        public int PID { set; get; }
        public string Fornavn { set; get; }
        public string Etternavn { set; get; }
        public DateTime Fodselsdato { set; get; }
    }
}
