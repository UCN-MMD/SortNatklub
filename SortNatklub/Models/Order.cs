﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace SortNatklub.Models
{
    public class Order
    {
        // Disse properties bliver fyldt med data fra fetlerne på hjemmesiden ved hjælp af Jquery i script-filen.
        [JsonProperty("id")]
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
    }
}