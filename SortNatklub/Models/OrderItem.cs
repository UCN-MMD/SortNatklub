using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SortNatklub.Models
{
    public class OrderItem
    {
        public string ProductName { get; set; }
        public int ProductQuantity { get; set; }
        public int ProductPrice { get; set; }
    }
}