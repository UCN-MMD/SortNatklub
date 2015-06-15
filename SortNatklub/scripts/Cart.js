var app = {
    cart: {
        // Et array af items.
        items: [],
        // En function der hedder "subTotal".
        subTotal: function () {
            // Variable total er nul.
            var total = 0;
            // Et for loop der looper nedestående kode igennem for hver "item" der er i kurven.
            for (var i in app.cart.items) {
                // "total" er total (0) + items pris.
                // x = x + y (+=).
                total += app.cart.items[i].subTotal;
            }
            // retunere "total" som den nye pris.
            return total;
        },
        // En function der hedder "total".
        total: function () {
            // Variablen "subTotal" er functionen "subTotal" ovenover.
            var subTotal = app.cart.subTotal();
            // Variablen "total" er det "subTotal"s værdi.
            var total = subTotal;
            // Hvis total er større end "999".
            if (total > 999) {
                // "total" er "subTotal" * 0,9. Så minus 10%.
                total = subTotal * 0.9;
            }
            // Hvis total er større end "1999".
            if (total > 1999) {
                // "total" er "subTotal" * 0,9. Så minus 10%.
                total = subTotal * 0.8;
            }
            // retunere "total" som den nye pris.
            return total;
        },
        //En function der kaldes "update".
        update: function () {
            var $cart = $(".cart"),
                $items = $cart.find(".cart-items"),
                // Der laves en variable som er en li i vores ul, som der bruges som skabelon for de andre li'er.
                $itemTemplate = $items.find(".item.template");

            // Her fjernes alle li.items som ikke har klassen ".template".
            $items.find('.item:not(".template")').remove();

            // Et for loop der looper igennem for hver item der er i kurven.
            for (var i in app.cart.items) {
                // Der laves en variable "item".
                var item = app.cart.items[i],
                    // Der laves en variable "$item" som er li skabelonen som klones.
                    $item = $itemTemplate.clone();

                // Her indsættes data i de felter der er i li'en.
                $item.attr("data-id", item.product.id);
                $item.find(".name").text(item.product.name);
                $item.find(".price").text(item.subTotal + " kr.");
                $item.find(".amount").val(item.amount);

                // Klassen "template" fjernes fra den nye li item, så den vises.
                $item.removeClass("template");
                //$item (li.item (uden "template" klassen)) bliver tilføjet til ul.cart-items (listen over produkterne i kurven).
                $items.append($item);
            }
            // Der indsættes "kr." bagefter total prisen og total procentprisen.
            $cart.find(".cart-item-total").text(app.cart.subTotal() + " kr.");
            $cart.find(".cart-item-total-procent").text(app.cart.total() + " kr.");
        }
    }
};

// Nedenfor er koden der viser listen med produkter når der klikkes på pilen.
$(document).on("click", "li.category span.icon", function () {
    var $this = $(this);
    $this.siblings("ul.products").toggleClass("hidden");
    $this.toggleClass("reverse");
});

$(document).on("click", ".addProductAmount", function () {
    var $this = $(this),
        $product = $this.closest(".product"),
        name = $product.find(".product-name").text(),
        price = parseInt($product.find(".price").text()),
        id = parseInt($product.attr("data-id"));

    var index = -1;
    for (var i in app.cart.items) {
        if (app.cart.items[i].product.id == id) {
            index = i;
        }
    }

    if (index > -1) {
        app.cart.items[index].amount++;
        app.cart.items[index].subTotal = app.cart.items[index].amount * app.cart.items[index].product.price;
    } else {
        app.cart.items.push({ product: { id: id, name: name, price: price }, amount: 1, subTotal: price });
    }

    app.cart.update();
});

$(document).on("change", ".cart .item .amount", function () {
    var $this = $(this),
        // Der laves en variable der er den tætteste "li.item".
        $item = $this.closest(".item"),
        // Variable "id" bruger attributen "data-id"s værdi.
        id = parseInt($item.attr("data-id")),
        // Variablen "amount" er det der er indtastet i input feltet.
        amount = parseInt($this.val());
    // Der kan ikke vælges et mindre antal end 1.
    if (amount < 1) {
        $this.val(1);
    }
    // Hvis "amount" ikke er mindre end 1.
    else {
        // Et for loop der kører igennem for hvert item der er i kurven.
        for (var i in app.cart.items) {
            // Hvis et item id allerde findes.
            if (app.cart.items[i].product.id == id) {
                // Her sættes det nye antal.
                app.cart.items[i].amount = amount;
                // Her sættes den nye "subTotal".
                app.cart.items[i].subTotal = app.cart.items[i].amount * app.cart.items[i].product.price;
                // Loopet stoppes, da det ikke er nødvendigt at kører de andre igennem da vi har fundet det item med det rigtige id.
                break;
            }
        }
        // Vi kalder funktionen "update" for at opdatere kurven.
        app.cart.update();
    }
});

$(document).on("click", ".cart .item .remove", function () {
    var $this = $(this),
        $item = $this.closest('.item'),
        id = parseInt($item.attr('data-id'));

    for (var i in app.cart.items) {
        // Når den valge items id passer med et id i kurven slettes den fra arrayet (produkterne i kurven) ved hjælp af "splice".
        if (app.cart.items[i].product.id == id) {
            app.cart.items.splice(i, 1);
            // Loopet stoppes når den rigtige item er fundet.
            break;
        }
    }
    // Vi kalder funktionen "update" for at opdatere kurven.
    app.cart.update();
});


$(document).on("click", ".booking-button", function () {

    // $this er ".booking-button".
    var $this = $(this);

    // Hvis formen er valid (alle felter er udfyldt rigtig).
    if ($("#booking-form").valid()) {

        // Lav en variable der hedder "json" som er et object.
        var json = {};

        // Objectet "json" indeholder nedestående informationer.
        json.bookingName = $this.closest(".Pack").find('input[name="booking-name"]').val();
        json.bookingEmail = $this.closest(".Pack").find('input[name="booking-email"]').val();
        json.bookingPhone = $this.closest(".Pack").find('input[name="booking-phone"]').val();
        json.bookingGuests = $this.closest(".Pack").find('input[name="booking-amount"]').val();
        json.bookingDate = $this.closest(".Pack").find('input[name="booking-date"]').val();
        json.bookingMessage = $this.closest(".Pack").find('textarea[name="orderMessage"]').val();
        json.bookingTotal = $this.siblings(".cart").find("span.cart-item-total-procent").text();

        // Et array der indeholder produkterne i "cart".
        json.bookingProducts = new Array();

        // For hvert item i ul bliver der lavet et product som indeholder navn, antal og pris.
        $('ul.cart-items li.item:not(".template")').each(function (i, product) {
            json.bookingProducts.push({
                productName: $(product).find("span.name").text(),
                productQuantity: parseInt($(product).find(".amount").val()),
                productPrice: $(product).find("span.price").text()
            });
        });
        // Et ajax kald der ved hjælp af funktionerne i "OrdersRepository" class gemmer informationerne i databasen. 
        $.ajax({
            url: "/umbraco/api/orders/placeorder",
            dataType: "json",
            contentType: "application/json",
            type: "post",
            data: JSON.stringify(json)
        }).done(function (response) {
            alert("Din booking er blevet sendt. Vi vender tilbage hurtigst muligt.");
        }).fail(function (repsonse) {
            alert("Der skete en fejl. Prøv igen eller ring til os.");
        });
    }
    else {
        alert("Der gik noget galt. Kig venligst din booking igennem for fejl og udfyld alle felter i toppen.");
        window.scrollTo(0, 0);
    }
});
