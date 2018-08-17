using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace vueMVC.Controllers
{
        public class HomeController : Controller
        {
            public ActionResult Index()
            {
                return View();
            }

            public ActionResult Links()
            {
                return View();
            }
        }
    }