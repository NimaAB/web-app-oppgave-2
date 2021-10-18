﻿using System;
using System.ComponentModel.DataAnnotations;

namespace Web_app_oppgave_2.Models
{
    public class Billett
    {
        [Key]
        public int BillettID { get; set; }
        public string Type { get; set; }
        public DateTime Utreise { get; set; }
        public DateTime Ankomst{ get; set; }
        public int AntallSykler { get; set; }
        public int Kjæledyr { get; set; }
        public virtual Passasjer Passasjer { get; set; }
        public virtual Bestilling Bestilling { get; set; }
        public virtual Rute Tur { get; set; }
        public virtual Rute Retur { get; set; }

    }
}
