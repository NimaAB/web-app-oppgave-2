using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using Web_app_oppgave_2.Controllers;
using Web_app_oppgave_2.DAL.RuteServices;
using Web_app_oppgave_2.Models;
using Assert = Microsoft.VisualStudio.TestTools.UnitTesting.Assert;

namespace web_app_2_unit_testing
{
    public class RuteTest
    {
        [Test]
        public async Task HentEnRute()
        {
            var mock = new Mock<IRuteRepository>();
            mock.Setup(r => r.HentEn(1)).ReturnsAsync(new Rute());
            var controller = new RuteController(mock.Object);

            var resultat = await controller.HentEnRute(1);
            var okResult = resultat as ObjectResult;
            
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
        }
        
        [Test]
        public async Task HentAlleRuter()
        {
            var mock = new Mock<IRuteRepository>();
            mock.Setup(r => r.HentAlle()).ReturnsAsync(new List<Rute>());
            var controller = new RuteController(mock.Object);

            var resultat = await controller.HentAlleRuter();
            var okResult = resultat as ObjectResult;
            
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
        }

        [Test]
        public async Task OppdaterRute()
        {
            var innRute = new Rute
            {
                Tur = "Trondheim-Oslo",
                Pris = 299,
            };
            
            var mock = new Mock<IRuteRepository>();
            mock.Setup(r => r.Oppdater(1, innRute)).ReturnsAsync(true);
            var controller = new RuteController(mock.Object);
            
            var resultat = await controller.OppdaterRute(1, innRute);
            var okResult = resultat as ObjectResult;

            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
        }

        [Test]
        public async Task SlettRute()
        {
            var mock = new Mock<IRuteRepository>();
            mock.Setup(r => r.Slett(1)).ReturnsAsync(true);
            var controller = new RuteController(mock.Object);

            var resultat = await controller.SlettRute(1);
            var okResult = resultat as ObjectResult;
            
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
        }
        
        [Test]
        public async Task LagreRute()
        {
            var innRute = new Rute
            {
                Tur = "Trondheim-Kiel",
                Pris = 1299,
            };

            var mock = new Mock<IRuteRepository>();
            mock.Setup(r => r.Lagre(innRute)).ReturnsAsync(true);
            var controller = new RuteController(mock.Object);

            var resultat = await controller.LagreRute(innRute);
            var okResult = resultat as ObjectResult;
            
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
        }
    }
}