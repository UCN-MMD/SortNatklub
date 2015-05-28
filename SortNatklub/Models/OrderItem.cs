using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SortNatklub.Models
{
    public class OrderItem
    {
        [JsonProperty("productName")]
        public string ProductName { get; set; }
        [JsonProperty("productQuantity")]
        public int ProductQuantity { get; set; }
        [JsonProperty("productPrice")]
        public string ProductPrice { get; set; }
    }
}