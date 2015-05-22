/*Navigation*/
$(document).on("click", ".burger", function () {
    $(this).toggleClass("selected");

    if ($(".burger").hasClass("selected")) {
        $("nav").css("left", "0");
    }
    else {
        $("nav").css("left", "-285px");
    }
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