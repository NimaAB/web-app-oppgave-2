using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Web_app_oppgave_2.DAL.LoggInnServices;
using Web_app_oppgave_2.Models;

namespace Web_app_oppgave_2.DAL
{
    public class Db : DbContext
    {
        public Db(DbContextOptions<Db> options) : base(options)
        {
            Database.EnsureCreated();
        }
        
        public virtual DbSet<Kunde> Kunder { get; set; }
        public virtual DbSet<Bestilling> Bestillinger { get; set; }
        public virtual DbSet<Billett> Billetter { get; set; }
        public virtual DbSet<Passasjer> Passasjerer { get; set; }
        public virtual DbSet<Maaltid> Maaltider { get; set; }
        public virtual DbSet<Lugar> Lugarer { get; set; }
        public virtual DbSet<MaaltidBestilling> MaaltidBestillinger { get; set; }
        public virtual DbSet<LugarBestilling> LugarBestillinger { get; set; }
        public virtual DbSet<Postnummer> Poststeder { get; set; }
        public virtual DbSet<Rute> Ruter { get; set; }
        public virtual DbSet<BillettRute> BillettRuter { get; set; }
        public virtual DbSet<Bruker> Brukere { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //importert pakken Microsoft.EntityFrameworkCore.Proxies
            optionsBuilder.UseLazyLoadingProxies();
        }

        public static void Initialize(IApplicationBuilder app)
        {
            var serviceScope = app.ApplicationServices.CreateScope();
            var db = serviceScope.ServiceProvider.GetService<Db>();
            
            var brukernavn = "admin";
            var passord = "Admin1";
            var passordSalt = LoginRepository.LagSalt();
            var passordHash = LoginRepository.LagHash(passord, passordSalt);
            
            var admin = new Bruker();
            admin.Brukernavn = brukernavn;
            admin.PassordHash = passordHash;
            admin.PassordSalt = passordSalt;

            db.Brukere.AddAsync(admin);
            db.SaveChangesAsync();
        }
    }
}
