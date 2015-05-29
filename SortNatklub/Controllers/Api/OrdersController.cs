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

namespace SortNatklub.Controllers.Api
{
    public class OrdersController : UmbracoApiController
    {
        OrdersRepository repository;

        public OrdersController()
        {
            repository = new OrdersRepository();
        }

        [HttpPost]
        public HttpResponseMessage PlaceOrder(Order order)
        {
            try
            {
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