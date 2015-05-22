using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Umbraco.Core.Models;

namespace SortNatklub.Models
{
    public class Product
    {
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("bodyText")]
        public string BodyText { get; set; }

        public Product(IPublishedContent productNode)
        {
            Name = productNode.Name;
            BodyText = productNode.GetProperty("bodyText").Value.ToString();
        }
    }
}