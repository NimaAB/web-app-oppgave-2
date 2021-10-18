using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web_app_oppgave_2.Models
{
    public class Postnummer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Postnr { get; set; }
        public string Poststed { get; set; }
    }
}
