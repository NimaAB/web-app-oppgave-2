using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using Web_app_oppgave_2.Controllers;
using Web_app_oppgave_2.DAL.MaaltidServices;
using Web_app_oppgave_2.Models;
using Assert = Microsoft.VisualStudio.TestTools.UnitTesting.Assert;

namespace web_app_2_unit_testing
{
    public class MaaltidTest
    {
        [Test]
        public async Task HentEnMaaltid()
        {
            var mock = new Mock<IMaaltidRepository>();
            mock.Setup(m => m.HentEn(1)).ReturnsAsync(new Maaltid());
            var controller = new MaaltidController(mock.Object);

            var resultat = await controller.HentEnMaaltid(1);
            var okResult = resultat as ObjectResult;
            
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
        }
        
        [Test]
        public async Task HentAlleMaaltiderr()
        {
            var mock = new Mock<IMaaltidRepository>();
            mock.Setup(m => m.HentAlle()).ReturnsAsync(new List<Maaltid>());
            var controller = new MaaltidController(mock.Object);

            var resultat = await controller.HentAlleMaaltider();
            var okResult = resultat as ObjectResult;
            
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
        }

        [Test]
        public async Task OppdaterMaaltid()
        {
            var innMaaltid = new Maaltid
            {
                Navn = "Frokost",
                Beskrivelse = "Beskrivelse",
                Pris = 299,
            };
            
            var mock = new Mock<IMaaltidRepository>();
            mock.Setup(m => m.Oppdater(1, innMaaltid)).ReturnsAsync(true);
            var controller = new MaaltidController(mock.Object);
            
            var resultat = await controller.OppdaterMaaltid(1, innMaaltid);
            var okResult = resultat as ObjectResult;

            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
        }

        [Test]
        public async Task SlettMaaltid()
        {
            var mock = new Mock<IMaaltidRepository>();
            mock.Setup(m => m.Slett(1)).ReturnsAsync(true);
            var controller = new MaaltidController(mock.Object);

            var resultat = await controller.SlettMaaltid(1);
            var okResult = resultat as ObjectResult;
            
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
        }
        
        [Test]
        public async Task LagreMaaltid()
        {
            var innMaaltid = new Maaltid
            {
                Navn = "Frokost",
                Beskrivelse = "Beskrivelse",
                Pris = 299,
            };

            var mock = new Mock<IMaaltidRepository>();
            mock.Setup(m => m.Lagre(innMaaltid)).ReturnsAsync(true);
            var controller = new MaaltidController(mock.Object);

            var resultat = await controller.LagreMaaltid(innMaaltid);
            var okResult = resultat as ObjectResult;
            
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
        }
    }
}