using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SortNatklub.Models
{
    public class Order
    {
        public int Id { get; set; }
        [JsonProperty("bookingName")]
        public string Name { get; set; }
        [JsonProperty("bookingEmail")]
        public string Mail { get; set; }
        [JsonProperty("bookingPhone")]
        public string Phone { get; set; }
        [JsonProperty("bookingGuests")]
        public int Guests { get; set; }
        [JsonProperty("bookingDate")]
        public DateTime Date { get; set; }
        [JsonProperty("bookingMessage")]
        public string Message { get; set; }
        [JsonProperty("bookingTotal")]
        public string Total { get; set; }
        [JsonProperty("bookingProducts")]
        public List<OrderItem> Products { get; set; }

        //public void Calculate()
        //{
        //    Total = 0;

        //    foreach (OrderItem product in Products)
        //    {
        //        Total += product.ProductPrice * product.ProductQuantity;
        //    }
        //}
    }
}