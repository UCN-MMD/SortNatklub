using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Umbraco.Web;

namespace SortNatklub.Models.Repositories
{
    public class ProductsRepository
    {
        UmbracoHelper helper;

        public ProductsRepository()
        {
            helper = new UmbracoHelper(UmbracoContext.Current);
        }

        public List<Product> GetAllProducts()
        {
            List<Product> products = new List<Product>();
            var productNodes = helper.Content(1071).Descendants("Produkt");

            foreach (var node in productNodes) {
                products.Add(new Product(node));
            }
            
            return products;
        }
    }
}