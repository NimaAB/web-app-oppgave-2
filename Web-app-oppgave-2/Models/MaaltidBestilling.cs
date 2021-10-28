using System;
using System.ComponentModel.DataAnnotations;

namespace Web_app_oppgave_2.Models
{
    public class MaaltidBestilling
    {
        [Key]
        public int MBid { get; set; } 
        public virtual Maaltid Maaltid { get; set; }
        public virtual Bestilling Bestilling { get; set; }
        public DateTime Tid { get; set; }
    }
}