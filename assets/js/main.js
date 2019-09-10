if(/Android/.test(navigator.appVersion)) {
    window.addEventListener("resize", function() {
        if(document.activeElement.tagName=="INPUT" || document.activeElement.tagName=="TEXTAREA") {
            document.activeElement.scrollIntoView();
        }
    });
} 


var block = $('<div>').css({'height':'50px','width':'50px'}),
    indicator = $('<div>').css({'height':'200px'}),
    scrollbarWidth = 0;

$('body').append(block.append(indicator));
var w1 = $('div', block).innerWidth();    
block.css('overflow-y', 'scroll');
var w2 = $('div', block).innerWidth();
$(block).remove();
scrollbarWidth = (w1 - w2);


var bodyScrollOptions = {
    reserveScrollBarGap: true
};

function openModal(hrefModal) {
    
    if ($(hrefModal).length > 0){
        $(hrefModal).fadeIn(300);
    
        bodyScrollLock.clearAllBodyScrollLocks();
        bodyScrollLock.disableBodyScroll(hrefModal, bodyScrollOptions);
    }
}

function closeModals() {
    if (scrollbarWidth > 0) {
        $('.popup-block:not(:hidden)').fadeOut(200, function() {
            bodyScrollLock.clearAllBodyScrollLocks();
        });
    } else {
        $('.popup-block:not(:hidden)').fadeOut(200);
        
        bodyScrollLock.clearAllBodyScrollLocks();
    }
}


$(document.body).on('click','[data-toggle="modal"]',function(e) {
    e.preventDefault();
    
    var hrefModal = $(this).attr('data-target');
    
    openModal(hrefModal);
});

$(document.body).on('click','.popup-block__overlay',function(e) {
    var closeButton = $(this).children('[data-toggle="dismiss"]');
    
    if (e.target != this) {
//      return false;
    } else {
        closeModals();
    }
});


$(document.body).on('click','[data-toggle="dismiss"]',function(e) {
    e.preventDefault();
    
    closeModals();
});

$(document).ready(function () {
 if( $(".swiper-container").length ) {
      var mainSwiper = new Swiper ('#main_slider', {
        slidesPerView: 1,
        navigation: {
            nextEl: '.main-button-next',
            prevEl: '.main-button-prev',
        },
        pagination: {
            el: ".js--main-pag",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
        },
      });
        $(window).resize(function() {
            mainSwiper.update(true),
            console.log("mainSwiper update")
        })
 }
});

$(document).ready(function () {
 if( $(".swiper-container").length ) {
      var partnerSwiper = new Swiper ('#partners_slider', {
        slidesPerView: 6,
        spaceBetween: 30,
        navigation: {
            nextEl: '.partners-button-next',
            prevEl: '.partners-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 1,
            },
            1199: {
                slidesPerView: 1,
            },
        }
      });
        $(window).resize(function() {
            partnerSwiper.update(true),
            console.log("partnerSwiper update")
        })
 }
});

$(document).ready(function () {
 if( $(".swiper-container").length ) {
      var distributorSwiper = new Swiper ('#distributor_slider', {
        slidesPerView: 1,
        navigation: {
            nextEl: '.distributor-button-next',
            prevEl: '.distributor-button-prev',
        },
        pagination: {
            el: ".js--distributor-pag",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 1,
            },
            1199: {
                slidesPerView: 1,
            },
        }
      });
        $(window).resize(function() {
            distributorSwiper.update(true),
            console.log("distributorSwiper update")
        })
 }
});

$(document).ready(function () {
 if( $(".swiper-container").length ) {
      var videoSwiper = new Swiper ('#video_slider', {
        slidesPerView: 1,
        navigation: {
            nextEl: '.video-button-next',
            prevEl: '.video-button-prev',
        },
        pagination: {
            el: ".js--video-pag",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 1,
            },
            1199: {
                slidesPerView: 1,
            },
        }
      });
        $(window).resize(function() {
            videoSwiper.update(true),
            console.log("videoSwiper update")
        })
 }
});

$(document).ready(function () {
 if( $(".swiper-container").length ) {
      var projectSwiper = new Swiper ('#project_slider', {
        slidesPerView: 'auto',
        spaceBetween: 70,
        loop: true,
        speed: 600,
        navigation: {
            nextEl: '.project-button-next',
            prevEl: '.project-button-prev',
        },
        pagination: {
            el: ".js--project-pag",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 1,
            },
            1199: {
                slidesPerView: 1,
            },
        }
      });
        $(window).resize(function() {
            projectSwiper.update(true),
            console.log("projectSwiper update")
        })
 }
});

$('.projects-block__photo-gallery-link').on('click', function() {
    var thisArray = $(this).attr('data-images-array');
    $.fancybox.open({
     src  : thisArray
    });
});

$.extend($.validator.messages, {
    required: "Ошибка. Поле обязательно для заполнения",
    email: "Ошибка. Пожалуйста, введите корректный адрес электронной почты",
});

// $('.btn--play').on('click', function() {
//  var thisVideoSrc = $(this).attr('src');
 
//  $(this).parent().append('<iframe' + thisVideoSrc '></iframe>');
//  $(this).parent().find('iframe').get(0).play();
//  $(this).remove();
// });

$("form").each(function() {
    $(this).validate({
        errorPlacement: function(e, i) {
              e.addClass("error-message"),
              e.appendTo(i.parent("div"))
        },
        highlight: function(e) {
            $(e).addClass("has-error").parent().addClass("has-error");
        },
        unhighlight: function(e) {
            $(e).removeClass("has-error").parent().removeClass("has-error");
        },
        ignore: [],
        rules: {
            name: "required",
            tel: {
                required: !0
            },
            email: {
                required: !0,
                email: true
            }
        },
    });
});