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






