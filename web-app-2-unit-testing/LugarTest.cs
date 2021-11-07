using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;
using Web_app_oppgave_2.Controllers;
using Web_app_oppgave_2.DAL.LugarServices;
using Web_app_oppgave_2.Models;
using Assert = Microsoft.VisualStudio.TestTools.UnitTesting.Assert;

namespace web_app_2_unit_testing
{
    public class LugarTest
    {
        [Test]
        public async Task HentEnLugar()
        {
            var mock = new Mock<ILugarRepository>();
            mock.Setup(l => l.HentEn(1)).ReturnsAsync(new Lugar());
            var loggerMock = Mock.Of<ILogger<LugarController>>();
            var controller = new LugarController(mock.Object, loggerMock);

            var resultat = await controller.HentLugar(1);
            var okResult = resultat as ObjectResult;
            
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
        }
        
        [Test]
        public async Task HentAlleLugarer()
        {
            var mock = new Mock<ILugarRepository>();
            mock.Setup(l => l.HentAlle()).ReturnsAsync(new List<Lugar>());
            var loggerMock = Mock.Of<ILogger<LugarController>>();
            var controller = new LugarController(mock.Object, loggerMock);
            
            var resultat = await controller.HentAlleLugarer();
            var okResult = resultat as ObjectResult;
            
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
        }

        [Test]
        public async Task OppdaterLugar()
        {
            var innLugar = new Lugar
            {
                Type = "Rom",
                Navn = "Standard",
                Kapasitet = 3,
                Beskrivelse = "Beskrivelse",
                MaxReservasjon = 10,
                Pris = 1099
            };
            
            var mock = new Mock<ILugarRepository>();
            mock.Setup(l => l.Oppdater(1, innLugar)).ReturnsAsync(true);
            var loggerMock = Mock.Of<ILogger<LugarController>>();
            var controller = new LugarController(mock.Object, loggerMock);
            /*
            Mock<ISession> sessionMock = new Mock<ISession>();
            
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["LoggetInn"] = "LoggetInn";
            sessionMock.Verify();
            //controller.HttpContext.Session.SetString("LoggetInn","LoggetInn");
            */
            var resultat = await controller.OppdaterLugar(1, innLugar);
            var okResult = resultat as ObjectResult;

            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
        }

        [Test]
        public async Task SlettLugar()
        {
            var mock = new Mock<ILugarRepository>();
            mock.Setup(l => l.Slett(1)).ReturnsAsync(true);
            var loggerMock = Mock.Of<ILogger<LugarController>>();
            var controller = new LugarController(mock.Object, loggerMock);

            var resultat = await controller.SlettLugar(1);
            var okResult = resultat as ObjectResult;
            
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
        }
        
        [Test]
        public async Task LagreRute()
        {
            var innLugar = new Lugar
            {
                Type = "Rom",
                Navn = "Standard",
                Kapasitet = 3,
                Beskrivelse = "Beskrivelse",
                MaxReservasjon = 10,
                Pris = 1099
            };

            var mock = new Mock<ILugarRepository>();
            mock.Setup(l => l.Lagre(innLugar)).ReturnsAsync(true);
            var loggerMock = Mock.Of<ILogger<LugarController>>();
            var controller = new LugarController(mock.Object, loggerMock);

            var resultat = await controller.LagreLugar(innLugar);
            var okResult = resultat as ObjectResult;
            
            Assert.IsNotNull(okResult);
            Assert.AreEqual(200, okResult.StatusCode);
        }
        
    }
}