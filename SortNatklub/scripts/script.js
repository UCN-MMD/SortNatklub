/*Navigation*/
$(document).on("click", ".burger", function () {
    $(this).toggleClass("selected");

    var windowWidth = $(window).width();

    if ($(".burger").hasClass("selected")) {
        $("nav").css("left", "0");
    }
    else {
        $("nav").css("left", -windowWidth);
    }

    $(document).on("click", ".contact-link", function () {
        $("nav").css("left", -windowWidth);
        $(".burger").removeClass("selected");
    });

    $(document).on("click", "ul.main-nav li", function () {
        var $this = $(this);
        $this.children("ul.subnav").toggleClass("hidden");
    });

});
//Footer i bunden
$(document).on("ready", function () {
    var windowHeight = $(window).height();
    var footerHeight = $('#footer').height();
    var footerTop = $('#footer').position().top + footerHeight;

    if (footerTop < windowHeight) {
        $('#footer').css('margin-top', 10 + (windowHeight - footerTop) + 'px');
    }
});

/*Kontakt*/
$(document).on('submit', 'form.contact-form', function (e) {
    e.preventDefault();
    var $this = $(this)

    var json = {};
    json.name = $this.find('input[name="name"]').val();
    json.email = $this.find('input[name="email"]').val();
    json.message = $this.find('textarea[name="message"]').val();

    $.ajax({
        url: "/umbraco/api/mail/contact",
        dataType: "json",
        contentType: "application/json",
        type: "post",
        data: JSON.stringify(json)
    }).done(function (response) {
        alert("Din mail er blevet sendt. Vi vender tilbage hurtigst muligt.");
    }).fail(function (repsonse) {
        alert("Der skete en fejl. Prøv igen eller ring til os.");
    });
});

/*Forside*/
$(document).on("ready", function () {
    if ($("body").hasClass("Forside")) {
        $("header").css("background-color", "rgba(0,0,0,0)");
        $("header").removeClass("boxShadow");
        $(".header-logo").on("click", function () {
            $("html, body").animate({
                scrollTop: 0
            }, 1200);
        });
        $(window).scroll(function () {
            var windowHeight = $(window).height() - 55;
            var scrollHeight = $(window).scrollTop();

            if (windowHeight < scrollHeight) {
                $("header").addClass("boxShadow");
                $("header").css("background-color", "#191919");
                $(".header-logo img").removeClass("hidden");
            }
            else {
                $("header").removeClass("boxShadow");
                $("header").css("background-color", "rgba(0,0,0,0)");
                $(".header-logo img").addClass("hidden");
            }
        });
    }
    else {
        $("header").addClass("boxShadow");
        $("header").css("background-color", "#191919");
        $(".header-logo img").removeClass("hidden");
    }
});

$(document).on("click", ".mouse-wrapper", function () {
    $("html, body").animate({
        scrollTop: $(window).height()
    }, 1200);
});
$(document).on("click", "img.logo", function () {
    $("html, body").animate({
        scrollTop: $(window).height()
    }, 1200);
});

/*Booking*/
$(document).on("ready", function () {
    $(".booking-date").fdatepicker({
    });
});

$(document).on("click", ".pack-info-button", function () {
    var $this = $(this);
    $this.parent(".pack-button-wrapper").siblings(".pack-info").toggleClass("hidden");
});

//$(document).on("click", ".pack-button", function () {
//    var $this = $(this);

//    if ($this.children("label").children("input.pack-checkbox").is(":checked")) {
//        $this.parent(".pack-button-wrapper").parent(".pack-wrapper").addClass("marked");
//    }
//    else {
//        $this.parent(".pack-button-wrapper").parent(".pack-wrapper").removeClass("marked");
//    }
//});

$(document).on("click", "li.category span.icon", function () {
    var $this = $(this);
    $this.siblings("ul.products").toggleClass("hidden");
    $this.toggleClass("reverse");
});

$(document).on("click", ".addProductAmount", function () {
    var $this = $(this);
    var currentAmount = parseInt($this.next().html(), 10);
    var newAmount = currentAmount + 1;

    $this.next(".amount").text(newAmount);
});

$(document).on("click", ".subtractProductAmount", function () {
    var $this = $(this);
    var currentAmount = parseInt($this.prev().html(), 10);
    if (currentAmount > 0) {
        var newAmount = currentAmount - 1;

        $this.prev(".amount").text(newAmount);
    }
});

/*Add amount on cart item*/
$(document).ready(function () {
    var arrays = new Array();

    $(document).on("click", "li.product  span.addProductAmount", function () {
        var $this = $(this).parent().closest("li");

        var thisID = $this.attr("id");
        var itemName = $this.find("span.product-name").html();
        var itemQuantity = $this.find("span.amount").html();
        var itemPrice = $this.find("span.price").html();

        var onethousand = 999;
        var twothousand = 1999;

        if (include(arrays, thisID)) {
            var price = $('#each-' + thisID).children("span.cart-item-price").html();
            var name = $('#each-' + thisID).children("span.cart-item-name").html();
            var quantity = $('#each-' + thisID).children("span.cart-item-amount").html();
            quantity = parseInt(itemQuantity);

            var total = parseInt(itemPrice) * parseInt(quantity);

            $('#each-' + thisID).children("span.cart-item-price").html(total + " kr");
            $('#each-' + thisID).children("span.cart-item-amount").html(quantity);

            var prev_charges = $("span.cart-item-total").html();
            prev_charges = parseInt(prev_charges) + parseInt(total);

            prev_charges = parseInt(prev_charges) - parseInt(price);

            var price_after = prev_charges;
            // Procenter
            if (parseInt(prev_charges) > twothousand) {
                price_after = parseInt(prev_charges - (prev_charges * 0.2));
            }
            else if (parseInt(prev_charges) > onethousand) {
                price_after = parseInt(prev_charges - (prev_charges * 0.1));
            }
            else {
                price_after = prev_charges;
            }

            $("span.cart-item-total").html(prev_charges + " Kr");
            $("span.cart-item-total-procent").html(price_after + " Kr");

        }
        else {
            arrays.push(thisID);

            var prev_charges = $("span.cart-item-total").html();
            prev_charges = parseInt(prev_charges) + parseInt(itemPrice);

            var price_after = prev_charges;
            // Procenter
            if (parseInt(prev_charges) > twothousand) {
                price_after = parseInt(prev_charges - (prev_charges * 0.2));
            }
            else if (parseInt(prev_charges) > onethousand) {
                price_after = parseInt(prev_charges - (prev_charges * 0.1));
            }
            else {
                price_after = prev_charges;
            }

            $("span.cart-item-total").html(prev_charges + " Kr");
            $("span.cart-item-total-procent").html(price_after + " Kr");

            $("ul.cart-items").append('<li id="each-' + thisID + '" class="product"><span class="cart-item-name">' + itemName + '</span><span class="cart-item-price">' + itemPrice + ' Kr </span><span class="cart-item-amount">' + itemQuantity + '</span><span class="fa fa-times remove"></span></li>');
        }
    });

    /*Subtract amount on cart item*/
    $(document).on("click", "li.product  span.subtractProductAmount", function () {
        var $this = $(this).parent().closest("li");

        var thisID = $this.attr("id");
        var itemName = $this.find("span.product-name").html();
        var itemQuantity = $this.find("span.amount").html();
        var itemPrice = $this.find("span.price").html();

        var onethousand = 999;
        var twothousand = 1999;

        if (include(arrays, thisID)) {
            var price = $('#each-' + thisID).children("span.cart-item-price").html();
            var name = $('#each-' + thisID).children("span.cart-item-name").html();
            var quantity = $('#each-' + thisID).children("span.cart-item-amount").html();

            quantity = parseInt(itemQuantity);

            var total = parseInt(itemPrice) * parseInt(quantity);

            $('#each-' + thisID).children("span.cart-item-price").html(total + " kr");
            $('#each-' + thisID).children("span.cart-item-amount").html(quantity);

            var prev_charges = $("span.cart-item-total").html();
            prev_charges = parseInt(prev_charges) - parseInt(itemPrice);

            var price_after = prev_charges;
            // Procenter
            if (parseInt(prev_charges) > twothousand) {
                price_after = parseInt(prev_charges - (prev_charges * 0.2));
            }
            else if (parseInt(prev_charges) > onethousand) {
                price_after = parseInt(prev_charges - (prev_charges * 0.1));
            }
            else {
                price_after = prev_charges;
            }


            $("span.cart-item-total").html(prev_charges + " Kr");
            $("span.cart-item-total-procent").html(price_after + " Kr");
        }
        else {
            arrays.push(thisID);

            var prev_charges = $("span.cart-item-total").html();
            prev_charges = parseInt(prev_charges) + parseInt(itemPrice);

            $("span.cart-item-total").html(prev_charges + " Kr");
            $("span.cart-item-total-procent").html(price_after + " Kr");

            $("ul.cart-items").append('<li id="each-' + thisID + '" class="product"><span class="cart-item-name">' + itemName + '</span><span class="cart-item-price">' + itemPrice + ' Kr </span><span class="cart-item-amount">' + itemQuantity + '</span><span class="fa fa-times remove"></span></li>');
        }
    });

    /*Remove item*/
    $(document).on("click", "span.remove", function () {
        var prev_price = $(this).siblings("span.cart-item-price").html();
        var prev_quantity = $(this).siblings("span.cart-item-amount").html();


        var deduct = parseInt(prev_price) * parseInt(prev_quantity);

        var prev_charges = $("span.cart-item-total").html();

        var thisID = $(this).parent().attr('id').replace('each-', '');

        var pos = getpos(arrays, thisID);
        arrays.splice(pos, 1, "0")

        prev_charges = parseInt(prev_charges) - parseInt(deduct);
        $("span.cart-item-total").html(prev_charges);
        $("span.cart-item-amount").html("0");
        $(this).parent("li").remove();
    });
});

/*Add pack to cart*/
/////////////////////////////////////////////////////////////////////////////////////// Mangler fjerne
$(document).on("click", ".pack-button", function () {
    var $this = $(this);
    var arrays = new Array();

    if ($this.children("label").children("input.pack-checkbox").is(":checked")) {
        var $pack = $this.parent(".pack-button-wrapper").parent(".pack-wrapper").addClass("marked");

        var thisID = $pack.attr("id");
        var itemName = $pack.children(".pack-name").find("h4").html();
        var itemQuantity = 1;
        var itemPrice = $pack.children(".pack-info").children(".pack-price").find("span").html();

        if (include(arrays, thisID)) {
            var price = $('#each-' + thisID).children("span.cart-item-price").html();
            var name = $('#each-' + thisID).children("span.cart-item-name").html();
            var quantity = $('#each-' + thisID).children("span.cart-item-amount").html();

            quantity = parseInt(itemQuantity);

            var total = parseInt(itemPrice);

            $('#each-' + thisID).children("span.cart-item-price").html(total + " kr");
            $('#each-' + thisID).children("span.cart-item-amount").html(quantity);

            var prev_charges = $("span.cart-item-total").html();

            prev_charges = parseInt(prev_charges) + parseInt(total);
            $("span.cart-item-total").html(prev_charges + " Kr");
        }
        else {
            arrays.push(thisID);

            var prev_charges = $("span.cart-item-total").html();
            prev_charges = parseInt(prev_charges) + parseInt(itemPrice);

            $("span.cart-item-total").html(prev_charges + " Kr");
            $("span.cart-item-total-procent").html(prev_charges + " Kr");

            $("ul.cart-items").append('<li id="each-' + thisID + '" class="product"><span class="cart-item-name">' + itemName + '</span><span class="cart-item-price">' + itemPrice + ' Kr </span><span class="cart-item-amount">' + itemQuantity + '</span><span class="fa fa-times remove"></span></li>');
        }
    }
    else {
        var $pack = $this.parent(".pack-button-wrapper").parent(".pack-wrapper").removeClass("marked");
    }
});


$(document).on("click", ".booking-button", function () {
    var $this = $(this);
    if ($("#booking-form").valid()) {
        var json = {};

        json.bookingName = $this.closest(".Pack").find('input[name="booking-name"]').val();
        json.bookingEmail = $this.closest(".Pack").find('input[name="booking-email"]').val();
        json.bookingPhone = $this.closest(".Pack").find('input[name="booking-phone"]').val();
        json.bookingGuests = $this.closest(".Pack").find('input[name="booking-amount"]').val();
        json.bookingDate = $this.closest(".Pack").find('input[name="booking-date"]').val();
        json.bookingMessage = $this.closest(".Pack").find('textarea[name="orderMessage"]').val();
        json.bookingTotal = $this.siblings(".total").find("span.cart-item-total-procent").text();
        json.bookingProducts = new Array();

        $("ul.cart-items li.product").each(function (i, product) {
            json.bookingProducts.push({
                productName: $(product).find("span.cart-item-name").text(),
                productQuantity: parseInt($(product).find("span.cart-item-amount").text()),
                productPrice: $(product).find("span.cart-item-price").text()
            });
        });






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
        alert("Der gik noget galt. Kig venligst din booking igennem for fejl og udfyld alle felter.")
    }
});



function include(arr, obj) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == obj) return true;
    }
}

function getpos(arr, obj) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == obj) return i;
    }
}




