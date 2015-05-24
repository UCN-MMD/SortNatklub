using SortNatklub.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web;
using System.Web.Http;
using Umbraco.Web.WebApi;

namespace SortNatklub.Controllers.Api
{
    public class MailController : UmbracoApiController
    {
        [HttpPost]
        public HttpResponseMessage Contact(ContactFormViewModel formModel)
        {
            try
            {
                HttpContext context = HttpContext.Current;
                SmtpClient smtp = new SmtpClient();
                smtp.Host = Config.AppSetting("Smtp.Host");
                smtp.Port = Config.AppSetting<int>("Smtp.Port");
                smtp.Credentials = new System.Net.NetworkCredential(Config.AppSetting("Smtp.User"), Config.AppSetting("Smtp.Password"));
                smtp.EnableSsl = true;
                MailMessage message = new MailMessage();
                message.To.Add(new MailAddress("dannbos@hotmail.com"));
                message.From = new MailAddress(formModel.Email);
                message.Body = formModel.Name + "</br>" + formModel.Message;
                message.Subject = "Kontaktform";

                smtp.Send(message);

                return Request.CreateResponse(HttpStatusCode.OK, (object)null, "application/json");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, (object)null, "application/json");
            }
        }
    }
}