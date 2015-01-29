  // Foundation JavaScript
  // Documentation can be found at: http://foundation.zurb.com/docs
  $(document).foundation({
    dropdown: {
      // specify the class used for active dropdowns
     is_hover: true
    },

    orbit: {
      animation: 'slide',
      animation_speed: 500,
      swipe: true,
      navigation_arrows: true,
      bullets: false,
      timer: false,
      slide_number: false
    },

    accordion: {
      content_class: 'content',
      active_class: 'active',
      multi_expand: true,
      toggleable: true
    }
    
  });

  $(document).ready(function(){

    jQuery.fn.exists = function(){return this.length>0;}

    if ($('.orbit-container').exists()) {

      // добавляем в контейнер к слайдеру иконку с зумом
      // тк. слайдер изменяет ul писок на div
      $( "#slider1" ).parents(".orbit-container").append('<span class="zoom"></span>');

      // по клику на кнопку зума открываем модальое окно с слайдером
      $(".zoom").click(function () {
          $('#enlarged-photo').foundation('reveal', 'open');
          resizeModal();
      });

  // open any modal window
      $(".js-modal-toggle").click(function () {
          var modal = $(this).attr("data-modal");
          $('.'+modal).foundation('reveal', 'open');
          resizeModal();
          return false;
      });

      // тк. слайдер геренирует свой темплейт при нажатии 
      // кнопки вне его контейнера скриптом создаю ивент по нажати на мою кнопку
      $('.orbit-next.icon').click(function() {
          $('#slider1').siblings('.orbit-next').click();
      });

      $('.orbit-prev.icon').click(function() {
          $('#slider1').siblings('.orbit-prev').click();
      });
    }

    if ($('.multiple-items').exists()) {
      $('.multiple-items').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5
      });
    
      $(document).on({
          mouseenter: function(){
             $(this).addClass("desk-visible");
          },
          mouseleave: function(){
              $(this).removeClass("desk-visible");
          }
      }, '.multiple-items .slick-slide');

      $('.other-products').hover(
        function () {
          $(this).addClass('is_hover');
        },
        function () {
          $(this).removeClass('is_hover');
        }
      );
    }

    if ($('.multiple-items-4').exists()) {
        $('.multiple-items-4').slick({
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 4
        });
    }

    if ($('.multiple-items-2').exists()) {
        $('.multiple-items-2').slick({
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 2
        });
    }
    if ($('.multiple-items-1').exists()) {
        $('.multiple-items-1').slick({
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1
        });
    }

    $("#modal-basket").click(function(){
      $('.multiple-items-4').slickNext();
    });


  $(document).on('open.fndtn.reveal.basket', '[data-reveal]', function () {
    $('.multiple-items-4').slickNext();
  });
    

    
    if ($('.f-dropdown').exists()) {
      // заменяет текст для дроп дауна
      $(".f-dropdown li a").click(function(){
        var selText = $(this).text();
        $(this).parents('.dropdown-content').find('button.open').text(selText);
        Foundation.libs.dropdown.close($('#city'));
      });
    }

    if ($('.js-range-slider').exists()) {
      // slider для цены
      var $range = $('.js-range-slider');
      $range.ionRangeSlider({
          type: "double",
          min: 300,
          max: 12000,
          grid: true,
          grid_num: 2,
          hide_min_max:true,
          hide_from_to:true
      });

      $range.on("change", function () {
          var $this = $(this);
          value = $this.prop("value").split(";");
          $("#before").val(value[0]);
          $("#after").val(value[1]);
      });

    }

    if ($('.bulk-select').exists()) {
      var bulk =  $(".bulk-select");
          this_imp = bulk.find('.number');
          this_val = parseFloat(this_imp.val());

      bulk.find('.plus').click(function(){
        this_val = parseFloat(this_imp.val());
        this_val = this_val+1;
        this_imp.val(this_val);
      });
      bulk.find('.minus').click(function(){
        this_val = parseFloat(this_imp.val());
        if (this_val <= 0) {
          this_val=0;
        } else{
          this_val = this_val-1;
        };
        this_imp.val(this_val);
      });
    }

    $(document).on({
        mouseenter: function(){
          $(this).addClass("desk-visible");
        },
        mouseleave: function(){
          $(this).removeClass("desk-visible");
      }
    }, '.item-filtered');

    if ($('.item-filtered').exists() && !$('.items').hasClass('grid')) {
        $('.item-filtered').find(".comment .all").each(function() {
        var comment = $(this),
            text,
            txlength,
            cuttext;

            text = comment.text();
            txlength = text.length;

            if(txlength > 58){
              cuttext = text.substring(0,58);
              comment.text(cuttext);
              comment.parents('.comment').append('<span class="readmore">'+text+'</span>');
            }
      });
      }

      $('a.auick-for').click(function(){
        var desk = $(this).parents('.description').children('p.desk'),
            height = 200;
        
        if(desk.height() < height){
            desk.animate({ height: "210px" }, 1000 );

        } else {
            desk.animate({ height: "100px" }, 1000 );
        };
        return false;
      });

      $(".js-input-tel").mask("+380(99)-999-99-99");

  });

  $(document).on('opened.fndtn.reveal', '[data-reveal]', function () {
      resizeModal();
  });
  $(window).resize(function() {
      resizeModal();
  });

function resizeModal(){
  var modal = $('.reveal-modal'),
      htmlWidth =  $('html').width(),
      htmlHeight =  $('html').height(),
      modalDopBlockHeight = modal.find('.photo-header').height() + modal.find('.photo-footer').height(),
      modalDopBlockWidth = modal.find('.photo-header').width() + modal.find('.photo-footer').width();

      var heightImg = htmlHeight - modalDopBlockHeight -150
          heightModal = htmlHeight - 150;

      modal.find('.orbit-slides-container').css('height',htmlHeight+"px");
      modal.find('.orbit-container').css('height',heightImg+"px");
      modal.find('.orbit-slides-container img').css('max-height',heightImg+"px");
}
