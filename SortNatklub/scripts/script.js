/*Navigation*/
$(document).on("click", ".burger", function () {
    $(this).toggleClass("selected");

    var windowWidth = $(window).width();

    if ($(".burger").hasClass("selected")) {
        $("nav").css("left", "0");
    }
    else {
        $("nav").css("left", - windowWidth);
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

/*Booking*/
$(document).on("ready", function () {
    $(".booking-date").fdatepicker({
    });
});

$(document).on("click", ".pack-info-button", function () {
    var $this = $(this);
    $this.parent(".pack-button-wrapper").siblings(".pack-info").toggleClass("hidden");
});

$(document).on("click", "li.category span.icon", function () {
    var $this = $(this);
    $this.siblings("ul.products").toggleClass("hidden");
});

$(document).on("click", ".addProductAmount", function () {
    var $this = $(this);
    var currentAmount = parseInt($this.prev().html(), 10);
    var newAmount = currentAmount + 1;

    $this.prev(".amount").text(newAmount);
    console.log(newAmount);
});

$(document).on("click", ".subtractProductAmount", function () {
    var $this = $(this);
    var currentAmount = parseInt($this.next().html(), 10);
    if (currentAmount > 0) {
        var newAmount = currentAmount - 1;

        $this.next(".amount").text(newAmount);
        console.log(newAmount);
    }
});