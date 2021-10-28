using System;
using System.ComponentModel.DataAnnotations;

namespace Web_app_oppgave_2.Models
{
    public class LugarBestilling
    {
        [Key]
        public int LBid { get; set; } 
        public virtual Lugar Lugar { get; set; }
        public virtual Bestilling Bestilling { get; set; }
        public DateTime Tid { get; set; }
    }
}