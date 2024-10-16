$(document).ready(function(){
    var lastScroll = 0,
        simpleDropdown = 0,
        linkDropdown = 0,
        isotopeObjs = [],
        swiperObjs = [],
        wow = '';

    /* check for browser os */
    var isMobile = false;
    var isiPhoneiPad = false;
    var mobileAnimation = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }

    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        isiPhoneiPad = true;
    }

    /* wow animation - on scroll */
    if ($('.wow').length > 0) {
        wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animate__animated',
            offset: 30,
            mobile: mobileAnimation,
            live: true
        });
        $(document).imagesLoaded(function () {
            wow.init();
        });
    }

    /* remove wow animation */
    function removeWowAnimation(gridObj) {
        gridObj.find('.grid-item').removeClass('animate__animated').css('visibility', ''); // avoid problem to filter after sorting
        if ($('.wow').length > 0) {
            gridObj.find('.grid-item').each(function () {
                var _this = $(this);
                // remove perticular element from WOW array when you don't want animation on element after DOM lead
                wow.removeBox(this);
                _this.css('-webkit-animation', 'none');
                _this.css('-moz-animation', 'none');
                _this.css('-ms-animation', 'none');
                _this.css('animation', 'none');
            });
        }
    }

    /* portfolio filter */
    $('.portfolio-wrapper').each(function () {
        var _this = $(this);
        if (!_this.find('.wow').length > 0) {
            _this.find('.grid-item').css('visibility', 'hidden');
        }

        _this.imagesLoaded(function () {
            if (!_this.find('.wow').length > 0) {
                _this.find('.grid-item').css('visibility', '');
            } else if (!isMobile) {
                _this.find('.grid-item').css('visibility', 'hidden');
            }
            //_this.removeClass('grid-loading');
            //_this.removeClass('grid-loading-white');
            _this.isotope({
                layoutMode: 'masonry',
                itemSelector: '.grid-item',
                percentPosition: true,
                stagger: 0,
                masonry: {
                    columnWidth: '.grid-sizer',
                }
            });
            _this.isotope();
            isotopeObjs.push(_this);
        });
    });
    $(document).on('click', '.portfolio-filter > li > a', function () {
        var _this = $(this),
            parentSectionObj = _this.parents('section');
        parentSectionObj.find('.portfolio-filter > li > a').removeClass('active');
        _this.addClass('active');
        var selector = _this.attr('data-filter'),
            portfolioFilter = parentSectionObj.find('.portfolio-wrapper');
        removeWowAnimation(portfolioFilter);
        portfolioFilter.isotope({filter: selector});
        return false;
    });

    // fancybox
    Fancybox.bind('[data-fancybox="single"]', {
        groupAttr: false,
    });

    Fancybox.bind('[data-fancybox="gallery"]', {
        // Custom options for the first gallery
        Hash: false,
        Thumbs: false,

        contentClick: "toggleCover",
        wheel : "slide",

        Carousel: {
            transition: "slide",
        },
        // Disable image zoom animation on opening and closing
        Images: {
            initialSize: "fit",
            zoom: false,
        },
        // Custom CSS transition on opening
        showClass: "f-fadeIn",

        Toolbar: {
            display: {
                left: ["infobar"],
                middle: [],
                right: ["fullscreen", "close"],
            },
        },
    });
});
