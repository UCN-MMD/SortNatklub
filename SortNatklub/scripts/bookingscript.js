$(document).ready(function (e) {
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

            // Finder klassen "xxx" og giver den indholdet der er i "bookingXXX".
            $order.find(".name").text(order.bookingName);
            $order.find(".mail").text(order.bookingEmail);
            $order.find(".phone").text(order.bookingPhone);
            $order.find(".guests").text(order.bookingGuests);
            $order.find(".date").text(order.bookingDate);
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

$(document).on("click", ".order", function (e) {
    $(this).next().toggleClass("active");
});