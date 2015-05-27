using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SortNatklub.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Mail { get; set; }
        public string Phone { get; set; }
        public int Guests { get; set; }
        public DateTime Date { get; set; }
        public string Message { get; set; }
        public int Total { get; set; }
        public List<OrderItem> Products { get; set; }

        public void Calculate()
        {
            Total = 0;

            foreach (OrderItem product in Products)
            {
                Total += product.ProductPrice * product.ProductQuantity;
            }
        }
    }
}