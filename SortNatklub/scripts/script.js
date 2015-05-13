$(document).on("click", ".burger", function () {
    $(this).toggleClass("selected");

    if ($(".burger").hasClass("selected")) {
        $("nav").css("left", "0");
    }
    else {
        $("nav").css("left", "-285px");
    }
});

$(window).scroll(function () {
    var windowHeight = $(window).height();
    var scrollHeight = $(window).scrollTop();
    $("header").removeClass("boxShadow");

    if (windowHeight < scrollHeight) {
        $("header").addClass("boxShadow");
        $("header").css("background-color", "#191919");
    }
});