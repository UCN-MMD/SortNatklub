using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Net;
using System.Net.Http;
using Umbraco.Web.WebApi;
using SortNatklub.Models.Repositories;

namespace SortNatklub.Controllers.Api
{
    public class ProductsController : UmbracoApiController
    {
        ProductsRepository repository;
        public ProductsController()
        {
            repository = new ProductsRepository();
        }

        public HttpResponseMessage GetProducts()
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, repository.GetAllProducts(), "application/json");
            } catch (Exception e) {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, (object)null, "application/json");
            }
        }
    }
}