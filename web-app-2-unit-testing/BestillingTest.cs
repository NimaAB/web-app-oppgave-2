using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using NUnit.Framework;
using Web_app_oppgave_2.Controllers;
using Web_app_oppgave_2.DAL.BestillingServices;
using Web_app_oppgave_2.Models;
using Assert = Microsoft.VisualStudio.TestTools.UnitTesting.Assert;

namespace web_app_2_unit_testing
{
    public class BestillingTest
    {
        private ILogger<BestillingController> _log;
        [Test]
        public async Task LagreBestillingOk()
        {
            var innKunde = new Kunde
            {
                Fornavn = "Odin",
                Etternavn = "Petersen",
                Tlfnummer = "98643257",
                Epost = "odin@oslomet.no",
                Adresse = "Oslometveien",
                Postnummer = new Postnummer
                {
                    Postnr = "0110",
                    Poststed = "Oslo"
                }
            };

            var billetter = new List<Billett>();
            var innBillett = new Billett
            {
                Type = "Tur-retur",
                Utreise = new DateTime(2021, 10, 01),
                Ankomst = new DateTime(2021, 10, 05),
                AntallSykler = 1,
                Kjæledyr = 0,
            };
            billetter.Add(innBillett);
            
            var innLugar = new Lugar
            {
                Type = "Rom",
                Navn = "Standard",
                Kapasitet = 3,
                Beskrivelse = "Beskrivelse",
                MaxReservasjon = 10,
                Pris = 1099
            };
            
            var lugarer = new List<LugarBestilling>();
            var innLugarB = new LugarBestilling
            {
                Lugar = innLugar,
                Tid = new DateTime(2021, 10, 05)
            };
            lugarer.Add(innLugarB);
            
            var innMaaltid = new Maaltid
            {
                Navn = "Frokost",
                Beskrivelse = "Beskrivelse",
                Pris = 299,
            };
            var maaltider = new List<MaaltidBestilling>();
            var innMaaltidB = new MaaltidBestilling
            {
                Maaltid = innMaaltid,
                Tid = new DateTime(2021, 10, 05)
            };
            maaltider.Add(innMaaltidB);

            var innBestilling = new Bestilling
            {
                Kunde = innKunde,
                Billetter = billetter,
                Lugarer = lugarer,
                Maaltider = maaltider,
                TotalPris = 4500
            };

            var loggerMock = Mock.Of<ILogger<BestillingController>>();
            var mock = new Mock<IBestillingRepository>();
            mock.Setup(b => b.Lagre(innBestilling)).ReturnsAsync(true);
            var controller = new BestillingController(mock.Object,loggerMock);

            var resultat = await controller.Lagre(innBestilling);
            var okResult = resultat as ObjectResult;
            
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
        }

        [Test]
        public async Task LagreBestillingBadRequest()
        {
            var innBestilling = new Bestilling();
            
            var loggerMock = Mock.Of<ILogger<BestillingController>>();
            var mock = new Mock<IBestillingRepository>();
            mock.Setup(b => b.Lagre(innBestilling)).ReturnsAsync(false);
            var controller = new BestillingController(mock.Object,loggerMock);

            var resultat = await controller.Lagre(innBestilling);
            var okResult = resultat as ObjectResult;
            
            Assert.IsNotNull(okResult);
            Assert.AreEqual(400, okResult.StatusCode);
        }
    }
}