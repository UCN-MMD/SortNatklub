$(document).on("click", ".burger", function () {
    $(this).toggleClass("selected");

    if ($(".burger").hasClass("selected")) {
        $("nav").css("left", "0");
    }
    else {
        $("nav").css("left", "-285px");
    }
});

$(document).on("ready", function () {
    if ($("body").hasClass("Forside")) {
        $("header").css("background-color", "rgba(0,0,0,0)");
        $("header").removeClass("boxShadow");

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