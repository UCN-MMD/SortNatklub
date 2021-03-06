﻿$(document).ready(function (e) {
    
    // Laver en variable der hedder "orders" som er table.
    var $orders = $(".orders"),

        // Laver en variable der hedder "orderTemplate" som er tr i tbody hvor booking detaljerne skal være.
        $orderTemplate = $orders.find(".order.template"),

        // Laver en variable der hedder "productsTemplate" som er tr i tbody hvor booking produkterne skal være.
        $productsTemplate = $orders.find(".products.template"),

        // Laver en variable der hedder "productTemplate" som er li inde i ul hvor hvert produkt skal være.
        $productTemplate = $productsTemplate.find(".product.template");

    $.ajax({
        // Kalder vores "GetAllOrders" funktion fra controlleren.
        url: "/umbraco/api/orders/getallorders"
    }).done(function (orders) {
        $.each(orders, function (o, order) {

            // Variablen "order" er en klon af "orderTemplate".
            var $order = $orderTemplate.clone();

            // Fjerner klassen "template" fra "order".
            $order.removeClass("template");

            //Formatere datoen ved hjælp af momentJS
            var date = moment.utc(order.bookingDate).format("DD-MM-YY");

            // Finder klassen "xxx" og giver den indholdet der er i "bookingXXX".
            $order.find(".orderID").text(order.id);
            $order.find(".name").text(order.bookingName);
            $order.find(".mail").text(order.bookingEmail);
            $order.find(".phone").text(order.bookingPhone);
            $order.find(".guests").text(order.bookingGuests);
            $order.find(".date").text(date);
            $order.find(".message").text(order.bookingMessage);
            $order.find(".total").text(order.bookingTotal);

            // Laver en variable der hedder "products" som er en klon af "productsTemplate".
            var $products = $productsTemplate.clone();

            // Fjerner klassen "template" fra "products".
            $products.removeClass("template");

            // For hver produkt i produkter
            $.each(order.bookingProducts, function (p, product) {
                // Laver en variable "product" der er en klon af "productTemplate".
                var $product = $productTemplate.clone();

                // Fjerner klassen "template" fra "product".
                $product.removeClass("template");


                // Finder klassen "xxx" og giver den indholdet der er i "productXXX".
                $product.find(".name").text(product.productName);
                $product.find(".quantity").text(product.productQuantity);
                $product.find(".price").text(product.productPrice);

                // indsæt "product" ind i listen.
                $products.find("ul").append($product);
            });

            // indsæt "order" ind i tbody.
            $orders.find("tbody").append($order);

            // indsæt "orders" ind i tbody.
            $orders.find("tbody").append($products);
        });

        // Fjern skabelonen der er blevet brugt.
        $(".orders .template").remove();
    });
});

// Når der klikkes på en "seeproducts" får tr "products" en klasse "aktiv".
$(document).on("click", ".seeProducts", function (e) {
    $(this).parent().next().toggleClass("active");
});

/*Send godkendelsesmail*/
// Når der klikkes på iconet "acceptBooking" starter vi vore funktion.
$(document).on("click", "span.acceptBooking", function (e) {
    e.preventDefault();

    // Variable "$this" er "span.acceptBooking".
    var $this = $(this),
    id = $this.parent().siblings(".orderID").text(),
    name = $this.parent().siblings(".name").text(),
    guests = $this.parent().siblings(".guests").text(),
    date = $this.parent().siblings(".date").text();

    // Variablen "json" indeholder "json.name, json.email ...".
    var json = {};    
    json.email = $this.parent().siblings(".mail").text();
    json.subject = "Din booking på Sort er blevet bekræftet";
    json.message = "Hej " + name + "<br/><br/>Vi bekræfter hermed din bordbooking på SORT Natklub d." + date + " for " + guests + " personer. Din booking består af: (liste af produkter).<br/><br/>Fremmøde skal ske før 01.00, ellers tillader vi os at sælge bordet til anden side. <br/><br/>Beløb op til 2000kr. kan betales med det samme igennem MobilePay. Du skal blot skrive ordre id'et #" + id + " i beskrivelses feltet og sende betalingen til tlf.: 60162106.<br/><br/>Har du eventuelle spørgsmål er du velkommen til at sende os en mail eller ringe til os på tlf.: 60162106. <br/>Vi glæder os til at se dig.";

    // Et ajax kald der henter informationerne, fra "BookingmailController" klassen, for at sende vores json data afsted som en mail.
    $.ajax({
        url: "/umbraco/api/bookingmail/booking",
        dataType: "json",
        contentType: "application/json",
        type: "post",
        data: JSON.stringify(json)
    }).done(function (response) {
        alert("Bookingen er blevet GODKENDT og der er blevet sendt en mail til: " + json.email);
        
    }).fail(function (repsonse) {
        alert("Der skete en fejl");
    });
});

/*Send afslåelsesmail*/
$(document).on("click", "span.denyBooking", function (e) {
    e.preventDefault();
    var $this = $(this),    
    name = $this.parent().siblings(".name").text(),
    guests = $this.parent().siblings(".guests").text(),
    date = $this.parent().siblings(".date").text();

    var json = {};
    json.name = $this.parent().siblings(".name").text();
    json.email = $this.parent().siblings(".mail").text();
    json.subject = "Din booking på Sort er desværre blevet afslået";
    json.message = "Hej " + name + "<br/><br/>Vi beklager, men din bordbooking på SORT Natklub d." + date + " for " + guests + " personer er desværre blevet aflyst.<br/><br/>Hvis du har eventuelle spørgsmål er du velkommen til at kontakte os på mail eller tlf.: 60162106.";


    $.ajax({
        url: "/umbraco/api/bookingmail/booking",
        dataType: "json",
        contentType: "application/json",
        type: "post",
        data: JSON.stringify(json)
    }).done(function (response) {
        alert("Bookingen er blevet AFSLÅET og der er blevet sendt en mail til: " + json.email);

    }).fail(function (repsonse) {
        alert("Der skete en fejl");
    });
});