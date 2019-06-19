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
      next_on_click: false,
      timer_speed: 5000,
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

    jQuery.fn.exists = function(){return this.length>0;};

    ///////////////////////////
    // begin new slider code //
    ///////////////////////////

    $('.js-carousel-main').slick({
        fade: true,
        asNavFor: '.js-carousel-nav',
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false
    });

    $('.js-carousel-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        variableWidth: true,
        asNavFor: '.js-carousel-main',
        arrows: false,
        focusOnSelect: true,
        infinite: false
    });

    $(".js-popup-trigger").on("click", function(){

        $('body').addClass('is-hidden');

        $('#enlarged-photo').foundation('reveal', 'open');
        
        return false;
    });
    $(document).on('open.fndtn.reveal', '[data-reveal]', function () {

        setTimeout(function(){

          var slides = $('.js-carousel-main').find('.slick-slide'),
            slidesLength = slides.length,
            currentSlideIndex = slides.filter('.slick-active')
                                      .index() + 1;
          $('.js-img-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
            $(".js-slide-index").text(nextSlide+1);
          });

          $(".js-img-slider").slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false,
              arrows: true,
              adaptiveHeight: true,
              initialSlide: currentSlideIndex - 1
          });

           $(".js-img-slider").resize();
           $(".js-slide-index").text(currentSlideIndex);
           $(".js-slides-counter").text(slidesLength);

        }, 230);

        setTimeout(function(){

          var sliderItemFour = $(".js-multiple-items-4");

          initSlider(sliderItemFour, {
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 4,
            draggable: false
          });
  
          function initSlider(slider, option) {
            slider.not('.slick-initialized').slick(option);
          };

          }, 100);
    });

    $('[data-reveal]').on('closed', function () {
        $(".js-img-slider").slick('unslick');
        $(".js-multiple-items-4").slick('unslick');
    });

///////////////////////////
// end new slider code   //
///////////////////////////


    function productTabs() {
      $('.js-item-tab').click(function() {
        var _this = $(this),
          p = _this.closest('.js-item-parent'),
          siblings = p.siblings();

        siblings.find($('.js-item-content')).slideUp();
        // siblings.find($('.js-item-content')).removeClass('is-active');
        p.find($('.js-item-content')).slideToggle();
        siblings.removeClass('is-active');
        p.toggleClass('is-active');
      });
    };
    productTabs();

    // text truncate inside the blocks
    if ($('.js-truncate').exists()) {
      $(".js-truncate").dotdotdot({
        ellipsis  : '... ',
        height: 36
      });
    }; 

    // text truncate inside the posts
    if ($('.js-truncate-post').exists()) {
      $(".js-truncate-post").dotdotdot({
        ellipsis  : '... ',
        watch: "window"
      });
    };

    // mini function 
   
    if ($('.js-scroll-filter').exists()) {
      $('.js-scroll-filter').perfectScrollbar();
    };

    function desktop() {
      return window.matchMedia("(min-width: 768px)").matches;
    }

    // open/close mobile menu
    // class Navigation {
    //   constructor(el) {
    //     this.el = $(el);
    //     this.btn = this.el.find('.js-nav-btn');
    //     this.nav = this.el.find('.js-mob-nav');
    //
    //     $(window).resize(() => {
    //       this._hideNavOnResize();
    //     });
    //   }
    //
    //   _showNav() {
    //     this.btn.click((e) => {
    //       e.preventDefault();
    //
    //       this.btn.toggleClass('is-active');
    //       this.el.toggleClass('is-active');
    //       this.nav.toggleClass('is-visible');
    //       var scrollWidth = detectScrollWidth();
    //
    //       if ( this.nav.hasClass('is-visible') ) {
    //         $('body')
    //           .addClass('is-overflow')
    //           .css('padding-right', scrollWidth + 'px');
    //       } else {
    //         $('body')
    //           .removeClass('is-overflow')
    //           .removeAttr('style');
    //       }
    //     });
    //   }
    //
    //   _hideNavOnResize() {
    //     if ( $(window).width() > 1280 && this.nav.hasClass('is-visible') ) {
    //       this._hideNav();
    //     }
    //   }
    //
    //   _hideNav() {
    //     this.btn.removeClass('is-active');
    //     this.el.removeClass('is-active');
    //     this.nav.removeClass('is-visible');
    //     $('body')
    //       .removeClass('is-overflow')
    //       .removeAttr('style');
    //   }
    //
    //   init() {
    //     this._showNav();
    //     // this._hideNavOnClick();
    //   }
    // }
    //
    // new Navigation('.js-top-nav').init();

    var navClass = {
      el: null,
      btn: null,
      nav: null,
      
      constructor: function(el) {

        this.el = $(el);
        this.btn = this.el.find('.js-nav-btn');
        this.nav = this.el.find('.js-mob-nav');

        var selfObj = this;

        $(window).resize(function() {
          selfObj._hideNavOnResize();
        });
      },

      _showNav: function() {
        var selfObj = this;
        this.btn.click(function(e) {
          e.preventDefault();

          selfObj.btn.toggleClass('is-active');
          selfObj.el.toggleClass('is-active');
          selfObj.nav.toggleClass('is-visible');
          var scrollWidth = detectScrollWidth();

          if ( selfObj.nav.hasClass('is-visible') ) {
            $('body')
              .addClass('is-overflow')
              .css('padding-right', scrollWidth + 'px');
          } else {
            $('body')
              .removeClass('is-overflow')
              .removeAttr('style');
          }
        });
      },

      _hideNavOnResize: function() {
        if ( $(window).width() > 1280 && this.nav.hasClass('is-visible') ) {
          this._hideNav();
        }
      },

      _hideNav: function() {
        this.btn.removeClass('is-active');
        this.el.removeClass('is-active');
        this.nav.removeClass('is-visible');
        $('body')
          .removeClass('is-overflow')
          .removeAttr('style');
      },

      init: function() {
        this._showNav();
        // this._hideNavOnClick();
      }
    };

    navClass.constructor('.js-top-nav');
    navClass.init();

    // detect scrollWidth
    function detectScrollWidth() {
      let outer = $('<div class="outer">')
                .css({ visibility: 'hidden', width: 100, overflow: 'scroll' })
                .appendTo('body'),
         inner = $('<div>')
                .css({width: '100%'})
                .appendTo(outer)
                .outerWidth();

      outer.remove();
      return 100 - inner;
    }

    // detect touch
    var isTouchDevice = function() { 'ontouchstart' in window };
    if ( !isTouchDevice() ) { $('body').addClass('no-touch') };


    // show/hide dropdown in navigation
    function initSubmenuToggle() {
      var navLink = $('.js-nav-link'),
        subnavLink = $('.js-subnav-link'),
        // navOption = $('.js-nav-option'),
        navDrop = $('.js-navdrop'),
        subDrop = $('.js-subnav-drop'),
        active = 'is-active';

      var hideCurrentNavDrop = function() {
        navLink.removeClass(active);
        navDrop.removeClass(active);
      };

      var showNavDrop = function(el) {
        $(el).addClass(active);
        $(el).parent().find(navDrop).addClass(active);
      };

      navLink.click(function(evt) {


        if ( $(window).width() <= 1024 ) {
          if ( $(this).siblings(navDrop).length ) {
            evt.preventDefault();
            var isActive = $(this).hasClass(active);

            hideCurrentNavDrop();
            if ( !isActive ) showNavDrop($(this));
          } else {
            hideCurrentNavDrop();
            $(this).addClass(active);
          }
        }
        else{
          if ( $(this).siblings(navDrop).length ) {
            evt.preventDefault();
            var isActive = $(this).hasClass(active);

            hideCurrentNavDrop();
            if ( !isActive ) $(this).addClass(active);
          } else {
            hideCurrentNavDrop();
            $(this).addClass(active);
          }
        }


      });

      subnavLink.click(function(evt) {
        if ( $(this).siblings(subDrop).length ) {
          evt.preventDefault();

          $(this).toggleClass(active);
          $(this).siblings(subDrop).toggleClass(active);
        }
      });

      $(window).resize(function() {
        if ( desktop() && navDrop.hasClass(active) ) {
          hideCurrentNavDrop();
        }
      });
    }

    initSubmenuToggle();

    // masonry for catalog-list
    if ($('.catalog-list-container').exists()) {
     $('.js-grid').isotope({
       itemSelector: '.js-grid-item',
       layoutMode: 'masonry',
       masonry: { 
         isFitWidth: true 
       }
     })
    };



    if ($('.js-modifications').exists()) {
      $('.js-delivery').removeClass('delivery_small');
    }
    else{
       $('.js-delivery').addClass('delivery_small');
    }

    if ($('.js-filters-btn').exists()) {
      $('.js-filters-btn').click(function(){
        if( $(window).width() >= 768 ){
          var btn      = $(this),
              parent  = btn.closest($('.js-filters-container')),
              mobCont = parent.find('.js-filters-mob');

          if (parent.hasClass('is-active') && mobCont.hasClass('is-active')) {
            parent.removeClass('is-active');
            mobCont.removeClass('is-active');
          }
          else{
            parent.addClass('is-active');
            mobCont.addClass('is-active');
          }
        }
      });
      
    };
    if( $(window).width() < 768 ){
      $('.js-filters-btn').attr("data-reveal-id", "filtersPop");
    }

    if ($('.orbit-container').exists()) {

      // добавляем в контейнер к слайдеру иконку с зумом
      // тк. слайдер изменяет ul писок на div
      $( "#slider1" ).parents(".orbit-container").append('<span class="zoom"></span>');

      // по клику на кнопку зума открываем модальое окно с слайдером
      $(".zoom").click(function () {
          $('#enlarged-photo').foundation('reveal', 'open');
          // resizeModal();
      });

  // open any modal window
      $(".js-modal-toggle").click(function () {
          var modal = $(this).attr("data-modal");
          $('.'+modal).foundation('reveal', 'open');

          $(window).trigger('resize');
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

    
    if ($('.js-multiple-items').exists()) {
        $('.js-multiple-items').slick({
          infinite: true,
          slidesToShow: 5,
          slidesToScroll: 5,
          draggable: true,
          responsive: [{
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 2
            }
          }, {
            breakpoint: 767,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
              arrows: false,
              variableWidth: true
            }
          }]

        });
      $(document).on({
          mouseenter: function(){
            if( $(window).width() >= 768 ){
              $(this).addClass("desk-visible");
            }
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
    
    if ($('.js-multiple-items-6').exists()) {
      $('.js-multiple-items-6').slick({
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 6,
        draggable: true,
        responsive: [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2
          }
        }, {
          breakpoint: 767,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            arrows: false,
            variableWidth: true
          }
        }]

      });
    }

    if ($('.js-multiple-items-4').exists()) {
        $('.js-multiple-items-4').slick({
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 4,
          draggable: true,
          responsive: [{
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 2
            }
          }, {
            breakpoint: 767,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
              arrows: false,
              variableWidth: true
            }
          }]

        });
    }
    
    if ($('.js-multiple-items-3').exists()) {
      $('.js-multiple-items-3').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
      });
    }


    if ($('.js-multiple-items-2').exists()) {
        $('.js-multiple-items-2').slick({
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 2,
          draggable: true
        });
    }
    if ($('.js-multiple-items-1').exists()) {
        $('.js-multiple-items-1').slick({
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          draggable: true,
          adaptiveHeight: false
        });
    }

    if ($('.js-blog-article-slider').exists()) {
      $('.js-blog-article-slider').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        draggable: true,
        vertical: true
      });

      if ($('.js-blog-article-slider .slick-slide .subtitle').exists()) {
        $('.js-blog-article-slider .slick-slide .subtitle').dotdotdot({
          ellipsis  : '... ',
          height: 38
        });
      }

      $('.js-blog-article-slider .slick-slide .content').dotdotdot({
        ellipsis  : '... ',
        height: 76
      });

      // let maxHeight = -1;
      // $('.js-blog-article-slider .slick-slide').each(function() {
      //   if ($(this).height() > maxHeight) {
      //     maxHeight = $(this).height();
      //   }
      // });
      // $('.js-blog-article-slider .slick-slide').each(function() {
      //   if ($(this).height() < maxHeight) {
      //     //$(this).find('.column').css('padding', Math.ceil((maxHeight-$(this).height())/2) + 'px 0');
      //     $(this).css('margin', Math.ceil((maxHeight-$(this).height())/2) + 'px 0');
      //   }
      // });
    }


    // destroy slick for mobile 
    if( $(window).width() < 768 ){
      $('.js-multiple-items-1').slick('unslick');
    }    
    // destroy slick for tab 
    if( $(window).width() < 1024 ){
      $('.js-unslick-tab').slick('unslick');
    }

    //$("#modal-basket").click(function(){
        // $('.js-multiple-items-4').slickNext();
        // $('.js-multiple-items-4').slick('slickNext');
    //});


    //$(document).on('open.fndtn.reveal.basket', '[data-reveal]', function () {
    //    $('.js-multiple-items-4').slick('slickNext');
    //});
    

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

    if ($('.js-range-slider-mob').exists()) {
      // slider для цены
      var $rangeMob = $('.js-range-slider-mob');
      if( $(window).width() < 768 ){
        $rangeMob.ionRangeSlider({
          type: "double",
          min: 300,
          max: 12000,
          grid: true,
          grid_num: 2,
          hide_min_max: true,
          hide_from_to: true
        });
      }
      else{
        $rangeMob.ionRangeSlider({
          type: "double",
          min: 300,
          max: 12000,
          grid: true,
          grid_num: 6,
          hide_min_max: true,
          hide_from_to: true
        });
      }

      $rangeMob.on("change", function () {
          var $this = $(this);
          value = $this.prop("value").split(";");
          $("#mobBefore").val(value[0]);
          $("#mobAfter").val(value[1]);
      });

    }

    // if ($('.bulk-select').exists()) {
    //   var bulk =  $(".bulk-select");
    //       this_imp = bulk.find('.number');
    //       this_val = parseFloat(this_imp.val());

    //   bulk.find('.plus').click(function(){
    //     this_val = parseFloat(this_imp.val());
    //     this_val = this_val+1;
    //     this_imp.val(this_val);
    //   });
    //   bulk.find('.minus').click(function(){
    //     this_val = parseFloat(this_imp.val());
    //     if (this_val <= 0) {
    //       this_val=0;
    //     } else{
    //       this_val = this_val-1;
    //     };
    //     this_imp.val(this_val);
    //   });
    // }

    $(document).on({
        mouseenter: function(){
          if( $(window).width() >= 1024 ){
            $(this).addClass("desk-visible");
          }
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

      function hideText(){
        var desk = $(".js-desk"),
            deskNativeHeight = desk.outerHeight(),
            heightFlag = 150;
        if(deskNativeHeight > heightFlag){
          desk.addClass('desk_short');
        }
      }

      hideText();

      $('a.auick-for').click(function(){
        var desk = $(".js-desk");
        
        if(desk.hasClass('desk_short')){
            desk.removeClass('desk_short');

        } else {
            desk.addClass('desk_short');
        };
        return false;
      });

      // $(".js-input-tel").mask("+38(999)-999-99-99");

      $(".js-show-all").on("click", function(){
        var attr = $(this).attr("data-text");
        var text = $(this).text();
        $(this).parent().find(".js-hidden-all").slideToggle(10);
        $(this).attr("data-text", text).children().text(attr);
        return false;
      });

      $(".js-dropdown-toggle").hover(
        function() {
          var menu = $("div[data-drop='"+$(this).attr("data-drop")+"']");
          var left = $(this).offset().left;
          var right = $(window).width() - left - $(this).outerWidth();
          var top = $(this).parent().position().top + $(this).parent().outerHeight(true);
          var reset = menu.width() + right;
          if ($(this).hasClass("js-dropdown-right")) {
            if (reset > $(window).width()) {
                menu.css({
                right: 'auto',
                left: 'auto',
                top: top
              }).show();
              // console.log("!!!!");
            }
            else{
              menu.css({
                right: right,
                left: 'auto',
                top: top
              }).show();
            }
            console.log(top);
          }
          else {
            menu.css({
              left: left,
              top: top
            }).show();
             
          }
        }, 
        function() {
          var menu = $("div[data-drop='"+$(this).attr("data-drop")+"']");
          menu.hide();
        }
      );
      $(".js-dropdown").hover(
        function() {
          $(this).show();
          var menuLink = $("a[data-drop='"+$(this).attr("data-drop")+"']");
          menuLink.addClass("is-hovered");
        }, function() {
          $(this).hide();
          var menuLink = $("a[data-drop='"+$(this).attr("data-drop")+"']");
          menuLink.removeClass("is-hovered");
        }
      );

  });

  $(".js-toggle-description").on("click", function(){
    $(this).prev().toggleClass("is-visible");
    return false;
  });

  $(document).on('opened.fndtn.reveal', '[data-reveal]', function () {
    $(window).trigger('resize');
  });

  //$(document).on('opened.fndtn.reveal', '[data-reveal]', function () {
      // resizeModal();
  //});
  //$(window).resize(function() {
      // resizeModal();
  //});

// function resizeModal(){
//   var modal = $('.reveal-modal'),
//       htmlWidth =  $('html').width(),
//       htmlHeight =  $('html').height(),
//       modalDopBlockHeight = modal.find('.photo-header').height() + modal.find('.photo-footer').height(),
//       modalDopBlockWidth = modal.find('.photo-header').width() + modal.find('.photo-footer').width();

//       var heightImg = htmlHeight - modalDopBlockHeight -150
//           heightModal = htmlHeight - 150;

//       modal.find('.orbit-slides-container').css('height',htmlHeight+"px");
//       modal.find('.orbit-container').css('height',heightImg+"px");
//       modal.find('.orbit-slides-container img').css('max-height',heightImg+"px");
// }


///////////////////////////
// begin new menu code   //
///////////////////////////


  $('.menu-catalog__item, .f-dropdown.content').hover(
    function () {
      $(".page-mask").addClass("bg-dark");
    },
    function () {
        $(".page-mask").removeClass("bg-dark");
    }
  );

  $(".js-dropdown-catalog").hover(
    function() {
      var menu = $("div[data-drop='"+$(this).attr("data-drop")+"']");

      if($(window).width() >= 1219) {
        menu.css({
          //top: '70px',
          left: '200px'
          
        }).show();
      } else{
           menu.css({
            left: '200px'
            
          }).show();
      }
    }, 
    function() {
      var menu = $("div[data-drop='"+$(this).attr("data-drop")+"']");
      menu.hide();
    }
  );

  $(".js-dropdown-catalog-dialog").hover(
      function() {
        $(this).show();
        var menuLink = $("a[data-drop='"+$(this).attr("data-drop")+"']");
        menuLink.parent().addClass("is-hovered");
      }, function() {
        $(this).hide();
        var menuLink = $("a[data-drop='"+$(this).attr("data-drop")+"']");
        menuLink.parent().removeClass("is-hovered");
      }
    );


  $(".menu-catalog").on("click", ".js-menu-catalog-head", function(){
    $(this).parent().toggleClass("is-inactive");
  });   


  $(window).scroll(function(){

      if($(window).scrollTop() > 205) {
          $(".js-menu-main").addClass("is-fixed");
          $(".menu-catalog__head a").removeClass("no-c-pointer");
          if(!$(".menu-catalog").hasClass("is-inactive")){
            $(".menu-catalog").addClass("is-inactive");
            $(".menu-catalog__head").addClass("js-menu-catalog-head");
            $(".f-dropdown.content-catalog").hide();
          } 

      } else {
          $(".js-menu-main").removeClass("is-fixed");
          if($(".menu-catalog").hasClass("is-inactive") && $(".menu-catalog").hasClass("index")){
            $(".menu-catalog").removeClass("is-inactive");
            $(".menu-catalog__head a").addClass("no-c-pointer");
            $(".menu-catalog__head").removeClass("js-menu-catalog-head");
          } 

      }

  });


  if($(window).width() <= 1024) {
    $(".menu-catalog").removeClass("index");
    $(".menu-catalog__head a").removeClass("no-c-pointer");
    $(".menu-catalog").addClass("is-inactive");
    $(".menu-catalog__head").addClass("js-menu-catalog-head");
  }

  


/////////////////////////
// end new menu code   //
/////////////////////////



//////////////////////////////////
// begin slider page-collection //
//////////////////////////////////

$('.product-box__slider .slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
  });
  
  $('.product-box__slider .slider-nav').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: false,
    centerMode: true,
    focusOnSelect: true,

    centerPadding: 1,
    responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4
      }
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 550,
      settings: {
        slidesToShow: 2
      }
    }

  ]
  });

//////////////////////////////////
// begin slider solutions //
//////////////////////////////////

$('.solution__slider .slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav',
    rows: 0
});

$('.solution__slider .slider-nav').slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: false,
    centerMode: true,
    focusOnSelect: true,

    centerPadding: 1,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4
            }
        }

    ]
});

if ($(window).width() < 768) {
   $(".reveal-modal").removeClass("is-fixed");
}


$('.js-compare-remove').on('click', function () {
   $(this).closest('.compare-item').remove();
});

if($('.js-compare-list')){
    function layout() {
        let cols = $('.js-compare-list').find('.js-col');
        let cellsLength = $('.js-compare-list').find('.js-col-characteristics .js-cell').length;

        let titleH = 0;
        for (let i = 1; i < cols.length; i++) {
            let height = $(cols[i]).find('.title').outerHeight();
            height > titleH ? titleH = height : false;
        }
        $(cols).find('.title').css('min-height', titleH);

        for (let n = 0; n < cellsLength; n++) {
            let height = 0;
            let cells = [];
            cols.each(function (i, el) {
                let cell = $(el).find('.js-cell')[n];
                cells.push(cell);
                let cellHeight = $(cell).outerHeight();
                cellHeight > height ? height = cellHeight : false;
                function cellHover() {
                    $(cell).on('mouseover', function () {
                        if (!$(this).hasClass('is-hovered')) {
                            $(cells).each(function (i, el) {
                                $(el).addClass('is-hovered');
                            })
                        }
                    });
                    $(cell).on('mouseout', function () {
                        if ($(this).hasClass('is-hovered')) {
                            $(cells).each(function (i, el) {
                                $(el).removeClass('is-hovered');
                            })
                        }
                    })

                }
                cellHover();
            });
            $(cells).each(function (i, el) {
                $(el).css('min-height', height);
            });
        }
    }
    function characteristics() {
        let btn = $('.js-compare-characteristics');
        btn.on('click', function () {
            btn.toggleClass('is-closed');
            $('.js-cells').slideToggle();
        })
    }
    let slider = $('.js-compare-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: false,
        appendArrows: $('.js-arrows'),
        responsive: [
            {
                breakpoint: 1220,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 980,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    });
    $(document).on('click', '.js-compare-remove-from-list', function (e) {
      e.preventDefault();
      slider.slick('slickRemove', ($(this).closest('.slick-slide').index()));
    });
    layout();
    characteristics();
    function debounce(func, wait, immediate) {
        let timeout;
        return function() {
            let context = this, args = arguments;
            let later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            let callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    let reinitLayout = debounce(function() {
        layout();
    }, 250);

    $(window).on('resize', reinitLayout);
}

$('.compare-button').on('click', function () {
    let active = $(this).hasClass('is-active');
    let commonText = $(this).data('common-text');
    let activeText = $(this).data('active-text');
    if (!active) {
        $(this).addClass('is-active')
            .find('.js-compare-button-text').text(activeText);
    } else {
        $(this).removeClass('is-active')
            .find('.js-compare-button-text').text(commonText);
    }
});

function scrollToAnchor(event, element) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();

    //забираем идентификатор бока с атрибута href
    var id  = element.attr('href'),

    //узнаем высоту от начала страницы до блока на который ссылается якорь
        top = $(id).offset().top;

    if($(window).scrollTop() > 205) {
        $('body,html').animate({scrollTop: (top - $(".js-menu-main").height())}, 1000);
      } else {
        $('body,html').animate({scrollTop: (top - $(".js-menu-main").height()*2)}, 1000);
      }
} 

$(".js-scroll-to").on("click", function (event) {
  scrollToAnchor(event, $(this));
});

const tooltipTrigger = $('.js-preview-tooltip-trigger');
const tooltip = $('.js-preview-tooltip');
const tooltipClose = $('.js-preview-tooltip-close');

function testTooltip() {
    tooltip.each(function (i, el) {
        const wrap = $(el),
            top = wrap.css('top'),
            left = wrap.css('left'),
            slide = wrap.closest('.slick-slide'),
            w = slide.width(),
            h = slide.height();
        if (left.substr(0, left.length - 2) - 210 <= 0 && !wrap.hasClass('is-right')){
            wrap.addClass('is-right');
        } else {
            if (wrap.hasClass('is-right')) {
                wrap.addClass('is-right');
            }
        }
        if (top.substr(0, top.length - 2) - 65 <= 0 && !wrap.hasClass('is-bot')){
            wrap.addClass('is-bot');
        } else {
            if (wrap.hasClass('is-bot')) {
                wrap.addClass('is-bot');
            }
        }
    });
}
testTooltip();
$(window).resize(function () {
    testTooltip();
});
tooltip.on('mouseover, click', function (e) {
    const wrap = $(this).closest(tooltip);

    if (!e.target.classList.contains('js-preview-tooltip-close') && e.type === "click" && $(window).width() < 767 && !wrap.hasClass('is-active')) {
      wrap.addClass('is-active');
    }

    if (e.type === "mouseover" && $(window).width() >= 767 && !wrap.hasClass('is-active')) {
      wrap.addClass('is-active');
    }

    // if (!wrap.hasClass('is-active')) {
    //   wrap.addClass('is-active');
    //   console.log('show');
    // }
});

tooltipClose.on('click', function () {
    const wrap = $(this).closest(tooltip);
    wrap.removeClass('is-active');
});

tooltip.on('mouseout', function () {
    const wrap = $(this).closest(tooltip);
    if (wrap.hasClass('is-active') && $(window).width() >= 767) {
        wrap.removeClass('is-active');
    }
});
// $(document).on('click', function (e) {
//     if (!tooltip.is(e.target)
//         && tooltip.has(e.target).length === 0 && tooltip.hasClass('is-active')) {
//         tooltip.removeClass('is-active');
//     }
// });
