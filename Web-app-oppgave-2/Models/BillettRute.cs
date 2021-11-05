using System;
using System.ComponentModel.DataAnnotations;

namespace Web_app_oppgave_2.Models
{
    public class BillettRute
    {
        [Key]
        public int BRId { get; set; }
        public virtual Billett Billett { get; set; }
        public virtual Rute Rute { get; set; }
        public DateTime Tid { get; set; }
    }
}