using Microsoft.EntityFrameworkCore;
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

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //importert pakken Microsoft.EntityFrameworkCore.Proxies
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}
