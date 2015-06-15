using SortNatklub.Models;
using SortNatklub.Models.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web;
using System.Web.Http;
using Umbraco.Web.WebApi;


// En controller er et object der håndtere HTTP requests.
namespace SortNatklub.Controllers.Api
{    
    public class OrdersController : UmbracoApiController
    {
        OrdersRepository repository;

        public OrdersController()
        {
            repository = new OrdersRepository();
        }

        //RESTful API HTTP Post methode (REpresentational State Transfer)
        [HttpPost]
        // HttpResponseMessage Constructor (PlaceOrder)
        //Initializes a new instance of the HttpResponseMessage class with a specific StatusCode.
        public HttpResponseMessage PlaceOrder(Order order)
        {
            try
            {
                // HttpStatusCode (OK 200, Not found 404, iternal server error 500 osv...)
                return Request.CreateResponse(HttpStatusCode.OK, repository.PlaceOrder(order), "application/json");
            }
            catch (Exception e)
            {
               return Request.CreateResponse(HttpStatusCode.InternalServerError, (object)null, "application/json");
            }
        }

        [HttpGet]
        public HttpResponseMessage GetOrder(int id)
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, repository.GetOrder(id), "application/json");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, (object)null, "application/json");
            }
        }

        [HttpGet]
        public HttpResponseMessage GetAllOrders()
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, repository.GetAllOrders(), "application/json");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, (object)null, "application/json");
            }
        }
    }
}