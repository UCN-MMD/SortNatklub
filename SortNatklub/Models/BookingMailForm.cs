using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SortNatklub.Models
{
    public class BookingmailForm
    {
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("subject")]
        public string Subject { get; set; }
        [JsonProperty("message")]
        public string Message { get; set; }
    }
}