﻿using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebAppOppgave1.DAL.BestillingServices;
using WebAppOppgave1.Models;

namespace WebAppOppgave1.Contollers
{
    [Route("[controller]/[action]")]
    public class BestillingController : ControllerBase
    {
        private readonly IBestillingRepository _db;

        public BestillingController(IBestillingRepository db)
        {
            _db = db;
        }

        public async Task<bool> Lagre(Bestilling innBestilling)
        {
            bool saved = await _db.LagreBestilling(innBestilling);
            return saved;
        }
    }
}
