'use strict';
	
$(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
});

$(document).ready(function() {
    $('#main-select').addClass('on');
    storeSelect();
    storeInfo();
    GNB();
    utileSub();
    mainVisual();
    MainCultureA();
    MainCultureB();
    mainBrand();
    mainMagazine();
    footer();
    btnTop();
});


function storeSelect() {
	//storeClick
	$('#store-select > a').on('click', function() {
		$(this).siblings().show();
	});
	//selectChange
	$('#store-select .store li a').on('click', function() {
		$('#store-select').addClass('on');
		$('#store-select .store li').removeClass('on');
		$(this).parent().addClass('on');
		var choice = $(this).text();
        $('#store-select a span').text(choice);
		$('#store-select .store').hide();
	});
	//storeMouseleave
	$('#store-select').on('mouseleave', function() {
		$(this).children('.store').hide();
	});
}//**storeSelect
	
function storeInfo() {
    if ($('#intro-check').is(':visible')) {
            $('#skip').on('click', function() {
                $('#intro-check .go-store').trigger('click');
            });
        }
	$('#intro-check .go-store').on('click', function() {
		$('#store-select').addClass('move');
		$('#main-info').addClass('on');
		$('#intro-check').hide();
		setTimeout(function() {
			$('#store-select').addClass('hide');
			$('#main-info').removeClass('on')
			$('#main-select').css({'visibility': 'hidden'});
		}, 3000);
	});
}//**storeInfo

function GNB() {
    checkScroll();
    
    //Submit 리프레쉬 막기
    $('button[type="submit"]').on('click', function(e) {
        e.preventDefault();
    });
    
    //GNB메뉴 : 서브메뉴 및 메뉴바 움직임
    $('#gnb > ul > li > a').on('mouseenter focus', function() {
        if ($('#utile-sub').hasClass('open') === true) return false;
        var barLeft = $(this).position().left;
        var barInner = $(this).innerWidth();
        var barWidth = $(this).width();
        var barPadding = barInner - barWidth;
        
        if ($(this).next().find('ul').length > 0) {
            var subHeight = $(this).next('ul').attr('data-height');
            $('#header').removeClass('open');
            $('#header').addClass('open').css({'height': subHeight + 'px'});
        } else {
            $('#header').css({'height': 115 + 'px'});
        }
        $('#gnb > ul > li').removeClass('on');
        $(this).parent().addClass('on');
        $('#gnb .bar').addClass('show').css({'left': ((barPadding / 2) + barLeft) + 'px', 'width': barWidth + 'px'});
    });
    $('#gnb > ul').on('mouseleave', function() { /*#gnb > ul > li*/
        $('#header').css({'height': 115 + 'px'}).removeClass('open');
        $('#gnb .bar').removeClass('show');
        $('#gnb > ul > li').removeClass('on');
    });
    
    $(window).on('scroll', function() {
        checkScroll();
    });
    
    function checkScroll() {
        //스크롤 : fixed 전환
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 70) {
                $('#header').addClass('fixed');
            } else {
                $('#header').removeClass('fixed');
            }
        });    
    }
    
}//**GNB

function utileSub() {
    //utileSub 버튼 : 서브메뉴 숨기기/보이기
    $('#utile-btn span a').on('click', function(e) {
        $('#utile-sub').addClass('open');
        if ($(e.target).parent().hasClass('login-btn') === true) {
            $('#utile-sub > div').removeClass('on');
            $('#utile-sub').find('.login-sub').addClass('on');
        } else {
            $('#utile-sub > div').removeClass('on');
            $('#utile-sub').find('.search-sub').addClass('on');
        }
        $('#utile-sub .close-btn a').on('click', function() {
            $('#utile-sub').removeClass('open');
            $('#utile-sub > div').removeClass('on');
        });
    });
    $('#main-event .title-add .link').on('click', function() {
        $('#utile-btn .login-btn a').trigger('click');
    });
    
}//**utileSub

function mainVisual() {
    var numSlide = $('#main-visual .slide .bg-slide li').length;
    var textSlide = $('#main-visual .slide .text-slide li').length;
    var slideNow = 0;
    var slidePrev = 0;
    var slideNext = 0;
    var timerId = null;
    var isTimerOn = true;
    var timerSpeed = 4000;
    var onAnimation = false;
    

    //indicator 자동 생성
    $('#main-visual .slide .bg-slide li').each(function(i) {
        $('#main-visual .tool .indicator').append('<li><a href="#">0' + (i + 1) + '</a></li>\n');
    });
    if (isTimerOn === true) {
        $('#main-visual .tool .play').addClass('on');
    } else {
        $('#main-visual .tool .play').removeClass('on');
    }
    showSlide(1);
    
    $('#main-visual .tool .indicator li a').on('click', function() {
        var index = $('#main-visual .tool .indicator li').index($(this).parent());
        showSlide(index + 1);
    });
    $('#main-visual .tool .control .prev').on('click', function() {
        showSlide(slidePrev);
    });
    $('#main-visual .tool .control .next').on('click', function() {
        showSlide(slideNext);
    });
    $('#main-visual .tool .play').on('click', function() {
        if (isTimerOn === true) {
            clearTimeout(timerId);
            $(this).removeClass('on');
            isTimerOn = false;
        } else {
            timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
            $(this).addClass('on');
            isTimerOn = true;
        }
    });
    
    function showSlide(n) {
        clearTimeout(timerId);
        if (slideNow === n || onAnimation === true) return false;
            onAnimation = true;
        if (slideNow === 0) {
            onAnimation = false;
        } else {
            setTimeout(function() {
            $('#main-visual .slide .bg-slide li:eq(' + (n - 1) + ')').stop().animate({'width': 100 + '%', 'z-index': 1}, function() {
                $('#main-visual .slide .bg-slide li:eq(' + (n - 1) + ')').siblings().css({'width': 0, 'z-index': 2});
                onAnimation = false;
                });    
            }, 500);
        }
        
        $('#main-visual .slide .text-slide li').removeClass('on');
        $('#main-visual .slide .text-slide li:eq(' + (n - 1) + ')').addClass('on');
        
        //마이너스 값
        if (slideNow > n) {
            $('#main-visual .slide .bg-slide li:eq(' + (n - 1) + ')').addClass('minus');
            $('#main-visual .slide .bg-slide li:eq(' + (n - 1) + ') div').addClass('minus');
        } else {
            $('#main-visual .slide .bg-slide ').find('.minus').removeClass('minus');
        }
        
        $('#main-visual .tool .indicator li').removeClass('on');
        $('#main-visual .tool .indicator li:eq(' + (n - 1) + ')').addClass('on');
        slideNow = n;
        slidePrev = (n <= 1) ? numSlide : (n - 1);
        slideNext = (n >= numSlide) ? 1 : (n + 1);
        if (isTimerOn === true) {
            timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
        }
    }
    
    
    
    
}//**mainVisual

function MainCultureA() {
    var numSlide = $('#main-culture .left ul li').length;
    var slideNow = 0;
    var slidePrev = 0;
    var slideNext = 0;

    showSlide(1);
   
    $('#main-culture .left .control .prev').on('click', function() {
        showSlide(slidePrev);
    });
    $('#main-culture .left .control .next').on('click', function() {
        showSlide(slideNext);
    });
    
    function showSlide(n) {
        $('#main-culture .left .pagination .now').text(n);
        $('#main-culture .left .pagination .total').text(numSlide);
        /*$('#main-culture .right ul li').css({'display': 'none'});
        $('#main-culture .right ul li:eq(' + (n - 1) + ')').css({'display': 'block'});*/
        $('#main-culture .left ul li').removeClass('on');
        $('#main-culture .left ul li:eq(' + (n - 1) + ')').addClass('on');
        slideNow = n;
        slidePrev = (n <= 1) ? numSlide : (n - 1);
        slideNext = (n >= numSlide) ? 1 : (n + 1);
    }
    
    
}//**MainCultureA

function MainCultureB() {

    var $itemW = $('#main-culture .right ul li').outerWidth(true);

    $('#main-culture .right ul li').each(function(index) {
        $(this).css({'left': (index * $itemW)});
    });
    $('#main-culture .right ul li:last').css({'left': -$itemW});
    
    $('#main-culture .left .control .prev').on('click', function() {
        $('#main-culture .right ul li').each(function () {

            var left = parseInt($(this).css('left'));
            var move = left + $itemW;

            $(this).stop(true).animate({
                left: move
            }, 500, function() {
                if (move >= ($itemW * 2)) {
                    $(this).css('left', -$itemW);
                }
            });
        });
    });


    $('#main-culture .left .control .next').on('click', function() {
        $('#main-culture .right ul li').each(function() {
            var left = parseInt($(this).css('left'));
            var move = left - $itemW;

            $(this).stop(true).animate({
                left: move
            }, 500, function() {
                if (move < -$itemW) {
                    $(this).css('left', ($itemW * 1));
                }
            });
        });
    });

} //**MainCultureB

function mainBrand() {
    
    // dummy
    $('#main-brand .brand-detail ul li').append('<img src="./img/main/brand_empty_box.png" alt="" />');
    
    // slide
    var numSlide = $('#main-brand .brand-detail ul').length;
    var slideNow = 0;
    var slidePrev = 0;
    var slideNext = 0;

    showSlide(1);

    $('#main-brand .brand-list .control .prev').on('click', function() {
        showSlide(slidePrev);
    });
    $('#main-brand .brand-list .control .next').on('click', function() {
        showSlide(slideNext);
    });

    function showSlide(n) {
        $('#main-brand .brand-detail ul').css({'display': 'none'});
        $('#main-brand .brand-detail ul:eq(' + (n - 1) +')').css({'display': 'block'});
        $('#main-brand .brand-list ul li').removeClass('on');
        $('#main-brand .brand-list ul li:eq(' + (n - 1) +')').addClass('on');
        slideNow = n;
        slidePrev = (n <= 1) ? numSlide : (n - 1);
        slideNext = (n >= numSlide) ? 1 : (n + 1);
    }     
} //**end mainBrand

function mainMagazine() {
    setTimeout(function() {
        $(window).on('scroll resize', function() {
                checkScroll();
            });
            //최대 높이값으로 통일
            var heighArray = $('#main-magazine .m-right ul').map(function() {
                return $(this).outerHeight(true);
            }).get();
            var maxHeight = Math.max.apply(Math, heighArray);
            var fixedWidth = $('#main-magazine .m-left').innerWidth();
            
            function checkScroll() {
                //스크롤 : fixed 전환
                var offsetTop = $('#main-magazine').offset().top;

                var magazineH = $('#main-magazine .m-right').offset().top + $('#main-magazine .m-right').outerHeight(true);
                var windowH = $(window).scrollTop() + $(window).height();

                var position = maxHeight - $('#main-magazine .m-left').height();
                
                $('#main-magazine .m-left').css({'width': fixedWidth});
                $('#main-magazine .m-right ul').height(maxHeight + 30);
                $(window).on('scroll', function() {
                    if ($(window).scrollTop() >= offsetTop) { 
                        $('#main-magazine .m-left').addClass('fixed');
                    } else if ($(window).scrollTop() < offsetTop) {
                        $('#main-magazine .m-left').removeClass('out fixed');
                    } if (windowH >= magazineH) {
                        $('#main-magazine .m-left').removeClass('fixed').addClass('out');
                    }
                    //return false;
                });
            }    
    }, 100);
} //**mainMagazine

function footer() {
    $('#footer .footer-top .out-link .family > li > a').on('click', function() {
        $('#footer .footer-top .out-link .family').toggleClass('on');
    });
}//**Footer

function btnTop() {
    $('#btn-top').on('click', function() {
        $('html, body').stop(true).animate({'scrollTop': 0}, 500);
    });
}//**btnTop




