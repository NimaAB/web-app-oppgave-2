﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppOppgave1.Models
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
        public virtual DbSet<Meal> Meals { get; set; }
        public virtual DbSet<Lugar> Lugarer { get; set; }
        public virtual DbSet<Postnummer> Poststeder { get; set; }
        public virtual DbSet<Rute> Ruter { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //importert pakken Microsoft.EntityFrameworkCore.Proxies
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}
