﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppOppgave1.Models
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
