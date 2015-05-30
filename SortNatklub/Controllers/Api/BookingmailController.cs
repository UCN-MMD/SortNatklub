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
    public class BookingmailController : UmbracoApiController
    {
        [HttpPost]
        public HttpResponseMessage Booking(BookingmailForm bookingMail)
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
                message.To.Add(new MailAddress(bookingMail.Email));
                message.From = new MailAddress("dannbos@hotmail.com");
                message.Body = "Hej " + bookingMail.Name + "<br/><br/>" + bookingMail.Message;
                message.Subject = bookingMail.Subject;
                message.IsBodyHtml = true;

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