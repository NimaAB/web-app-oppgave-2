using System.ComponentModel.DataAnnotations;

namespace Web_app_oppgave_2.Models
{
    public class BrukerDto // Objektet som kommer fra form
    {
        public string Brukernavn { get; set; }
        public string Passord { get; set; }
    }

    public class Bruker // Objektet som blir lagret i db
    {
        [Key]
        public int Id { get; set; }
        public string Brukernavn { get; set; }
        public byte[] PassordHash { get; set; }
        public byte[] PassordSalt { get; set; }
    }
}