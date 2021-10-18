using System;

namespace WebAppOppgave1.Models
{
    public class LugarBestilling
    {
        public int LBid { get; set; } 
        public virtual Lugar Lugar { get; set; }
        public virtual Bestilling Bestilling { get; set; }
        public DateTime Tid { get; set; }
    }
}