using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SortNatklub.Models
{
    public class OrderFormViewModel
    {
        public int OrderID { get; set; }
        public string Name { get; set; }
        public string Mail { get; set; }
        public int Phone { get; set; }
        public int Guests { get; set; }
        public string Date { get; set; }
        public string OrderMessage { get; set; }
        public int Total { get; set; }
    }
}