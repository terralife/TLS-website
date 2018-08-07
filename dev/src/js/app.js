"use strict";

jQuery( document ).ready(function($) {


    // Page element Declarations ----------------------------------

    // refer to these variables when targeting common elements instead of 
    // adding new $('.some-element') calls, avoiding unnecessary dom lookups

    let mainHeader = $('#main-header'),
        pageBody = $('body'),
        offCanvasMenu = $('#off-canvas-menu'),
        heroSlider = $('#hero-slider');




    // Toggle Mobile Menu -----------------------------------------

    $('#mobile-toggle').on('click', function(e) {
        e.preventDefault();
        $(offCanvasMenu).toggleClass('open');
        $(pageBody).toggleClass('noscroll');
    });

    $('#mobile-close').on('click', function() {
        $(offCanvasMenu).removeClass('open');
        $(pageBody).removeClass('noscroll');
    });

    // sub-toggles
    $('.mobile-sub-toggle').on('click', function(e) {
        e.preventDefault();
        $(this).parents('.menu-item').toggleClass('open').find('.level-2').toggleClass('open');
    })


    // Sticky header menu ----------------------------------------
    let prevScrollTop = 0,
    didScroll = false;

    $(window).scroll(function() {
        didScroll = true;
    });

    setInterval(function() {
        if ( didScroll ) {
            didScroll = false;
            headerScroll();
        }
    }, 50);

    function headerScroll() {
        let scrollTop = $(this).scrollTop();

        if ( scrollTop < 0 ) {
            scrollTop = 0;
        }
        if( scrollTop < 150) {
            $(pageBody).removeClass('page-scroll');
        }
        if ( scrollTop > $(pageBody).height() - $(window).height() ) {
            scrollTop = $(pageBody).height() - $(window).height();
        }

        if (scrollTop >= prevScrollTop && scrollTop) {
            if (scrollTop >= 250) {
            $(pageBody).addClass('page-scroll');
        }
        } else {

        }

        prevScrollTop = scrollTop;
    } // end Header Scroll function




    // Sliders  (Tiny Slider) ------------------------------------
    // Documentation: https://github.com/ganlanyuan/tiny-slider

    // Hero slider ----------
    if( heroSlider.length ) {
        var tinyHeroSlider = tns({
            container: '#hero-slider',
            items: 1,
            speed: 500,
            controls: false,
            autoplay: true,
            slideBy: 1,
            mouseDrag: true,
            lazyload: true,
            autoplayHoverPause: true,
            autoplayButtonOutput: false,
            controlsText: ["<i class='icon-chevron-right'></i>", "<i class='icon-chevron-right'></i>"],
            responsive: { 
                  768: {
                    controls: true
                },
                 }, 
          });
    }




    // Submit contact forms with Ajax -------------------------------

    $('form.contact-form').on('submit', function(e){
        e.preventDefault();
        $('.form-loader').fadeIn();
        let currentForm = $(this);
        
        $.ajax({
          type:'POST',
          url: $(currentForm).attr('action'),
          data: $(currentForm).serialize(),
          cache: false
        }).done(function(data){
          //success...
          if (data.success){
            $(currentForm).find('.contact-form__grid').fadeOut();
            $('.form-loader').fadeOut();
            $(currentForm).find('.contact-form__confirmation').fadeIn();
          }
          // errors...
          else{
            if (data.errors){
                console.log('Form Error');
              $.each(data.errors, function(field, msgs){
                // show errors by each errored field
                    console.log(field + ' - ' + msgs);
                    let errorP = document.createElement("p");
                    let errorContent = document.createTextNode(msgs);
                    errorP.appendChild(errorContent);
                    $(currentForm).find('#frm_' + field).after(errorP);
              });
              alert('There has been an error submitting your form. Please try again. If the error persists, please email or call us directly. Thank you, and we apologize for the inconvinience.');
            }
          }
        });
      });



      // Accessibility skip link ------------------------------------
      // Documentation / credit: 
      // https://www.bignerdranch.com/blog/web-accessibility-skip-navigation-links/

      $("a.skip").click(function(event){
    
        // strip the leading hash and declare
        // the content we're skipping to
        var skipTo="#"+this.href.split('#')[1];

        // Setting 'tabindex' to -1 takes an element out of normal 
        // tab flow but allows it to be focused via javascript
        $(skipTo).attr('tabindex', -1).on('blur focusout', function () {

            // when focus leaves this element, 
            // remove the tabindex attribute
            $(this).removeAttr('tabindex');

        }).focus(); // focus on the content container
    });
    

    // Open gallery images in lightbox --------------------------------
    $('.lightbox').featherlightGallery();



    // Expand FAQ items on click
    $('.faq-module__item-title').on('click', function() {
        $(this).parent().toggleClass('open');
    });
    // Open first item by default
    $('.faq-module__item:first-child').addClass('open');


}); // end jQuery document ready