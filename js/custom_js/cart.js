function addProductToCart(productId, amount, reloadAllPopupHtml, addValueToExistingInCart) {
    $.ajax({
        type: "POST",
        url: '/cart/ajax',
        data:  {
            productId: productId,
            amount: amount,
            orderPage: orderPage,
            addValueToExistingInCart: addValueToExistingInCart
        },
        success: function(data){
            if (data.products_count > 0) {

                if (reloadAllPopupHtml) {
                    $('#basket .basket-view').remove();
                    $('#basket .basket-header').after(data.cartProductsHtml);
                } else {
                    $('.cartPopupProductBlock[data-productId=' + productId + '] .priceTotal').html(number_format(data.updatedProductInfo.product_price_total, 2, ',', ' '));
                    $('.cartPopupProductBlock[data-productId=' + productId + '] .realAmount').html(number_format(data.updatedProductInfo.product_real_amount, 4, ',', ' ').toString() + '&nbsp;' + data.updatedProductInfo.product_measure);

                }

                if (data.total_price == 0) {
                    $('#basket #cartPopupTotalPrice').html('—');
                    $('#cartWidgetTotalPriceDecimalPart').html('—');
                    $('#cartWidgetTotalPriceFractionalPart').html('');
                } else {
                    $('#basket #cartPopupTotalPrice').html(number_format(data.total_price, 2, ',', ' '));
                    $('#cartWidgetTotalPriceDecimalPart').html(number_format(data.total_price_decimal_part, 0, ',', ' '));
                    $('#cartWidgetTotalPriceFractionalPart').html(data.total_price_fractional_part + ' грн');
                }

                $('#widgetFullCart').show();
                $('#widgetEmptyCart').hide();

                $('#cartWidgetCountProductsWords').html(data.count_products_words);


                if ($('#orderPageCartContentBlock').exists()) {
                    $('#orderPageCartContentBlock').html(data.orderPageSideCartHtml);
                }

                $('#basket').foundation('reveal', 'open');
            } else {
                if ($('#orderPageCartContentBlock').exists()) {
                    document.location = '/';
                }
                $('#basket').foundation('reveal', 'close');
                $('#widgetFullCart').hide();
                $('#widgetEmptyCart').show();
            }
        },
        dataType: 'json'
    });
}

function showPopup() {
    $.ajax({
        type: "POST",
        url: '/cart/ajax',
        success: function(data){
            if (data.products_count > 0) {
                $('#basket .basket-view').remove();
                $('#basket .basket-header h2').html('Редактирование товаров');
                $('#basket .basket-header').after(data.cartProductsHtml);
                $('#basket #cartPopupTotalPrice').html(number_format(data.total_price, 2, ',', ' '));

                $('#widgetFullCart').show();
                $('#widgetEmptyCart').hide();
                $('#cartWidgetTotalPriceDecimalPart').html(number_format(data.total_price_decimal_part, 0, ',', ' '));
                $('#cartWidgetTotalPriceFractionalPart').html(data.total_price_fractional_part + ' грн');
                $('#cartWidgetCountProductsWords').html(data.count_products_words);

                if ($('#orderPageCartContentBlock').exists()) {
                    $('#orderPageCartContentBlock').html(data.orderPageSideCartHtml);
                }

                $('#basket').foundation('reveal', 'open');
                $('#basket').foundation();
            } else {
                if ($('#orderPageCartContentBlock').exists()) {
                    document.location = '/';
                }
                $('#basket').foundation('reveal', 'close');
                $('#widgetFullCart').hide();
                $('#widgetEmptyCart').show();
            }
        },
        dataType: 'json'
    });
}

function getParamsOfProductInCart(productBlock) {
    var rawAmount = productBlock.find('.productAmountInput').val();
    var amount = parseAmount(rawAmount);
    if (isNaN(amount))
        amount = 1;
    var params = {
        productId: productBlock.attr('data-productId'),
        amount: amount,
        rawAmount: rawAmount
    };
    return params;
}

function isNumber(evt, canBeFloat) {
    if (typeof(canBeFloat) == 'undefined')
        canBeFloat = false;
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        if (!(canBeFloat && (charCode == 44 || charCode == 46)))
            return false;
    }
    return true;
}

function parseAmount(amount) {
    return parseFloat(amount.replace(',', '.'));
}

$(document).ready(function() {
    $( "#basket" ).on("click", ".cartPopupProductBlock .btn-del", function() {
        //if (confirm('Удалить товар?')) {
            var productBlock = $(this).closest('.cartPopupProductBlock');
            var params = getParamsOfProductInCart(productBlock);
            addProductToCart(params.productId, 0, true, false)
        //}
    });

    $( "#basket" ).on("click", ".plus", function(event) {
        var productBlock = $(this).closest('.cartPopupProductBlock');
        var params = getParamsOfProductInCart(productBlock);
        var amount = params.amount + 1;
        productBlock.find('.productAmountInput').val(amount);
        addProductToCart(params.productId, amount, true, false);
    });

    $( "#basket" ).on("click", ".minus", function(event) {
        var productBlock = $(this).closest('.cartPopupProductBlock');
        var params = getParamsOfProductInCart(productBlock);
        var amount = params.amount - 1;
        if (amount > 0) {
            productBlock.find('.productAmountInput').val(amount);
            addProductToCart(params.productId, amount, true, false);
        }
    });

    $( "#basket" ).on("keyup change", ".productAmountInput", function(event) {
        var productBlock = $(this).closest('.cartPopupProductBlock');
        var params = getParamsOfProductInCart(productBlock);
        var amount = params.amount;
        if (amount <= 0)
            amount = 1;
        if (event.type == 'change')
            productBlock.find('.productAmountInput').val(amount.toString().replace('.', ','));
        addProductToCart(params.productId, amount, false, false);
    });

    $('#widgetFullCart').on("click", showPopup);

    //$('#widgetFullCart').on("click", ".btn", showPopup);

    // Product page
    $('body').on("click", "#addToCartFromProductPage", function(event) {
            if(document.getElementById('totalCount')){
                var amount = parseAmount($('#totalCount').val());
            }else{
                var amount=1;
            }
        var productId = $(this).attr('data-productId');
        addProductToCart(productId, amount, true, true);
    });
    $( "body" ).on("change", "#totalCount", function(event) {
        var amount = parseAmount($('#totalCount').val());
        if (isNaN(amount))
            amount = 1;
        if (amount <= 0)
            amount = 1;
        $('#totalCount').val(amount);
    });

    $( "#productPagePlusMinusButtons" ).on("click", ".minus", function(event) {
        var amount = parseInt($('#totalCount').val());
        if (isNaN(amount))
            amount = 1;
        var amount = amount - 1;
        if (amount > 0) {
            $('#totalCount').val(amount);
        }
    });
    $( "#productPagePlusMinusButtons" ).on("click", ".plus", function(event) {
        var amount = parseInt($('#totalCount').val());
        if (isNaN(amount))
            amount = 1;
        var amount = amount + 1;
        $('#totalCount').val(amount);
    });

    // Products' list page
    $( "body" ).on("click", ".addToCartFromList", function(event) {
        var productId = $(this).attr('data-productId');
        var amount = 1;
        addProductToCart(productId, amount, true, true);
    });





});










function number_format(number, decimals, dec_point, thousands_sep) {	// Format a number with grouped thousands
    //
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +	 bugfix by: Michael White (http://crestidg.com)

    var i, j, kw, kd, km;

    // input sanitation & defaults
    if (isNaN(decimals = Math.abs(decimals))) {
        decimals = 2;
    }
    if (dec_point == undefined) {
        dec_point = ",";
    }
    if (thousands_sep == undefined) {
        thousands_sep = ".";
    }

    i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

    if ((j = i.length) > 3) {
        j = j % 3;
    } else {
        j = 0;
    }

    km = (j ? i.substr(0, j) + thousands_sep : "");
    kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
    //kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");
    kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");


    return km + kw + kd;
}

function trim(str, charlist) {	// Strip whitespace (or other characters) from the beginning and end of a string
    //
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: mdsjack (http://www.mdsjack.bo.it)
    // +   improved by: Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev)
    // +	  input by: Erkekjetter
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

    charlist = !charlist ? ' \s\xA0' : charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
    var re = new RegExp('^[' + charlist + ']+|[' + charlist + ']+$', 'g');
    return str.replace(re, '');
}