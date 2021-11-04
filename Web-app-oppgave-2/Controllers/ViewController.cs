using Microsoft.AspNetCore.Components.Routing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web_app_oppgave_2.Controllers
{
    [ApiController]
    [Route("")]
    public class ViewController : ControllerBase
    {
        private const string LoggetInn = "LoggetInn";
        
        private bool ValidSession()
        {
            return !string.IsNullOrEmpty(HttpContext.Session.GetString(LoggetInn));
        }

        [Route("/")]
        [Route("/kunde.html")]
        public void HomeRedirection()
        {
            Response.Redirect("/kunde.html");
        }
        
        [Route("index.html")]
        [Route("maaltider")]
        [Route("lugarer")]
        public ActionResult RuteRedirection()
        {
            return Redirect(ValidSession() ? "/ruter" : "/kunde.html");
        }
    }
}