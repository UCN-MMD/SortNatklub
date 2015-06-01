//$(document).ready(function () {
//    var arrays = new Array();

//$(document).on("click", ".addProductAmount", function () {
//    var $this = $(this);
//    var currentAmount = parseInt($this.next().html(), 10);
//    var newAmount = currentAmount + 1;

//    $this.next(".amount").text(newAmount);

//    /////////////////////////////////
    
//    var $product = $(this).parent().closest("li");

//    var thisID = $product.attr("id");
//    var itemName = $product.find("span.product-name").html();
//    //var itemQuantity = $product.find("span.amount").html(); NEWAMOUNT
//    var itemPrice = $product.find("span.price").html();

//    var onethousand = 999;
//    var twothousand = 1999;

//    if (include(arrays, thisID)) {
//        var price = $('#each-' + thisID).children("span.cart-item-price").html();
//        var name = $('#each-' + thisID).children("span.cart-item-name").html();
//        var quantity = $('#each-' + thisID).children("span.cart-item-amount").html();
//        quantity = parseInt(itemQuantity);

//        var total = parseInt(itemPrice) * parseInt(quantity);

//        $('#each-' + thisID).children("span.cart-item-price").html(total + " kr");
//        $('#each-' + thisID).children("span.cart-item-amount").html(quantity);

//        var prev_charges = $("span.cart-item-total").html();
//        prev_charges = parseInt(prev_charges) + parseInt(total);

//        prev_charges = parseInt(prev_charges) - parseInt(price);

//        var price_after = prev_charges;
//        // Procenter
//        if (parseInt(prev_charges) > twothousand) {
//            price_after = parseInt(prev_charges - (prev_charges * 0.2));
//        }
//        else if (parseInt(prev_charges) > onethousand) {
//            price_after = parseInt(prev_charges - (prev_charges * 0.1));
//        }
//        else {
//            price_after = prev_charges;
//        }

//        $("span.cart-item-total").html(prev_charges + " Kr");
//        $("span.cart-item-total-procent").html(price_after + " Kr");

//    }
//    else {
//        arrays.push(thisID);

//        var prev_charges = $("span.cart-item-total").html();
//        prev_charges = parseInt(prev_charges) + parseInt(itemPrice);

//        var price_after = prev_charges;
//        // Procenter
//        if (parseInt(prev_charges) > twothousand) {
//            price_after = parseInt(prev_charges - (prev_charges * 0.2));
//        }
//        else if (parseInt(prev_charges) > onethousand) {
//            price_after = parseInt(prev_charges - (prev_charges * 0.1));
//        }
//        else {
//            price_after = prev_charges;
//        }

//        $("span.cart-item-total").html(prev_charges + " Kr");
//        $("span.cart-item-total-procent").html(price_after + " Kr");

//        $("ul.cart-items").append('<li id="each-' + thisID + '" class="product"><span class="cart-item-name">' + itemName + '</span><span class="cart-item-price">' + itemPrice + ' Kr </span><span class="cart-item-amount">' + itemQuantity + '</span><span class="fa fa-times remove"></span></li>');
//    }
//});

//$(document).on("click", ".subtractProductAmount", function () {
//    var $this = $(this);
//    var currentAmount = parseInt($this.prev().html(), 10);
//    if (currentAmount > 0) {
//        var newAmount = currentAmount - 1;

//        $this.prev(".amount").text(newAmount);
//    }
//});

///*Add amount on cart item*/
//$(document).ready(function () {
//    var arrays = new Array();

//    $(document).on("click", "li.product  span.addProductAmount", function () {
        
//    });

//    /*Subtract amount on cart item*/
//    $(document).on("click", "li.product  span.subtractProductAmount", function () {
//        var $this = $(this).parent().closest("li");

//        var thisID = $this.attr("id");
//        var itemName = $this.find("span.product-name").html();
//        var itemQuantity = $this.find("span.amount").html();
//        var itemPrice = $this.find("span.price").html();

//        var onethousand = 999;
//        var twothousand = 1999;

//        if (include(arrays, thisID)) {
//            var price = $('#each-' + thisID).children("span.cart-item-price").html();
//            var name = $('#each-' + thisID).children("span.cart-item-name").html();
//            var quantity = $('#each-' + thisID).children("span.cart-item-amount").html();

//            quantity = parseInt(itemQuantity);

//            var total = parseInt(itemPrice) * parseInt(quantity);

//            $('#each-' + thisID).children("span.cart-item-price").html(total + " kr");
//            $('#each-' + thisID).children("span.cart-item-amount").html(quantity);

//            var prev_charges = $("span.cart-item-total").html();
//            prev_charges = parseInt(prev_charges) - parseInt(itemPrice);

//            var price_after = prev_charges;
//            // Procenter
//            if (parseInt(prev_charges) > twothousand) {
//                price_after = parseInt(prev_charges - (prev_charges * 0.2));
//            }
//            else if (parseInt(prev_charges) > onethousand) {
//                price_after = parseInt(prev_charges - (prev_charges * 0.1));
//            }
//            else {
//                price_after = prev_charges;
//            }


//            $("span.cart-item-total").html(prev_charges + " Kr");
//            $("span.cart-item-total-procent").html(price_after + " Kr");
//        }
//        else {
//            arrays.push(thisID);

//            var prev_charges = $("span.cart-item-total").html();
//            prev_charges = parseInt(prev_charges) + parseInt(itemPrice);

//            $("span.cart-item-total").html(prev_charges + " Kr");
//            $("span.cart-item-total-procent").html(price_after + " Kr");

//            $("ul.cart-items").append('<li id="each-' + thisID + '" class="product"><span class="cart-item-name">' + itemName + '</span><span class="cart-item-price">' + itemPrice + ' Kr </span><span class="cart-item-amount">' + itemQuantity + '</span><span class="fa fa-times remove"></span></li>');
//        }
//    });

//    /*Remove item*/
//    $(document).on("click", "span.remove", function () {
//        var prev_price = $(this).siblings("span.cart-item-price").html();
//        var prev_quantity = $(this).siblings("span.cart-item-amount").html();


//        var deduct = parseInt(prev_price) * parseInt(prev_quantity);

//        var prev_charges = $("span.cart-item-total").html();

//        var thisID = $(this).parent().attr('id').replace('each-', '');

//        var pos = getpos(arrays, thisID);
//        arrays.splice(pos, 1, "0")

//        prev_charges = parseInt(prev_charges) - parseInt(deduct);
//        $("span.cart-item-total").html(prev_charges);
//        $("span.cart-item-amount").html("0");
//        $(this).parent("li").remove();
//    });
//});

///*Add pack to cart*/
///////////////////////////////////////////////////////////////////////////////////////// Mangler fjerne
//$(document).on("click", ".pack-button", function () {
//    var $this = $(this);
//    var arrays = new Array();

//    if ($this.children("label").children("input.pack-checkbox").is(":checked")) {
//        var $pack = $this.parent(".pack-button-wrapper").parent(".pack-wrapper").addClass("marked");

//        var thisID = $pack.attr("id");
//        var itemName = $pack.children(".pack-name").find("h4").html();
//        var itemQuantity = 1;
//        var itemPrice = $pack.children(".pack-info").children(".pack-price").find("span").html();

//        if (include(arrays, thisID)) {
//            var price = $('#each-' + thisID).children("span.cart-item-price").html();
//            var name = $('#each-' + thisID).children("span.cart-item-name").html();
//            var quantity = $('#each-' + thisID).children("span.cart-item-amount").html();

//            quantity = parseInt(itemQuantity);

//            var total = parseInt(itemPrice);

//            $('#each-' + thisID).children("span.cart-item-price").html(total + " kr");
//            $('#each-' + thisID).children("span.cart-item-amount").html(quantity);

//            var prev_charges = $("span.cart-item-total").html();

//            prev_charges = parseInt(prev_charges) + parseInt(total);
//            $("span.cart-item-total").html(prev_charges + " Kr");
//        }
//        else {
//            arrays.push(thisID);

//            var prev_charges = $("span.cart-item-total").html();
//            prev_charges = parseInt(prev_charges) + parseInt(itemPrice);

//            $("span.cart-item-total").html(prev_charges + " Kr");
//            $("span.cart-item-total-procent").html(prev_charges + " Kr");

//            $("ul.cart-items").append('<li id="each-' + thisID + '" class="product"><span class="cart-item-name">' + itemName + '</span><span class="cart-item-price">' + itemPrice + ' Kr </span><span class="cart-item-amount">' + itemQuantity + '</span><span class="fa fa-times remove"></span></li>');
//        }
//    }
//    else {
//        var $pack = $this.parent(".pack-button-wrapper").parent(".pack-wrapper").removeClass("marked");
//    }
//});


//function include(arr, obj) {
//    for (var i = 0; i < arr.length; i++) {
//        if (arr[i] == obj) return true;
//    }
//}

//function getpos(arr, obj) {
//    for (var i = 0; i < arr.length; i++) {
//        if (arr[i] == obj) return i;
//    }
//}
