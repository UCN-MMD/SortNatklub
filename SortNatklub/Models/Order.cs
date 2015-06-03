using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace SortNatklub.Models
{
    public class Order
    {

        [JsonProperty("id")]
        public int Id { get; set; }

        //[Required]
        [JsonProperty("bookingName")]
        public string Name { get; set; }

        //[Required]
        [JsonProperty("bookingEmail")]
        public string Mail { get; set; }

        //[Required]
        [JsonProperty("bookingPhone")]
        public string Phone { get; set; }

        //[Required]
        [JsonProperty("bookingGuests")]
        public int Guests { get; set; }

        //[Required]
        [JsonProperty("bookingDate")]
        public DateTime Date { get; set; }

        [JsonProperty("bookingMessage")]
        public string Message { get; set; }

        [JsonProperty("bookingTotal")]
        public string Total { get; set; }
        
        [JsonProperty("bookingProducts")]
        public List<OrderItem> Products { get; set; }
    }
}