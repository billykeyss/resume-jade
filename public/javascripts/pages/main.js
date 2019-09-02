WebFont.load({
  google: {
    families: ['Open Sans:400,600,700,400italic,700italic', 'Roboto Condensed:400,700']
  }
});

$('body').css({'overflow':'hidden'});
$(document).bind('scroll',function () {
     window.scrollTo(0,0);
});


var expandCollapse = function(){
    if ( $(window).width() < 1000 ) {
        $(function(){
            $('.masonry').css('display', '');
            $('#categories').css('display', 'none');
        });
    }
    else {
        $(function(){
          // add a class .collapse to a div .showHide
          $('#categories').css('display', '');
          $('.masonry').css('display', 'none');// hides button display on bigger screen
        });
    }
}

expandCollapse();
$(window).resize(expandCollapse);

$(window).load(function() {
  // Animate loader off screen
    $(".loadingContainer").fadeOut(1000);
    $(document).unbind('scroll');
    $('body').css({'overflow':'visible'});
});

$(document).ready(function() {
    for (var i = 1; i <= 2; i++) {
        svgRender('about', 'images/svg/cloud.svg', '150px');
        svgRender('about', 'images/svg/cloud-1.svg', '150px');
        svgRender('about', 'images/svg/cloud-2.svg', '150px');
        svgRender('about', 'images/svg/cloud.svg', '150px');
        divRender('about', 'cloud8');

        divRender('skills', 'cloud5');
        divRender('skills', 'cloud6');
        svgRender('skills', 'images/svg/cloud.svg', '150px');
    }

    $(document).on('scroll', onScroll);

    $(function() {
        count = 0;
        wordsArrayShirt = ['CSS', 'HTML', 'JS', 'Node', 'Android', 'AWS'];
        setInterval(function() {
            count++;
            $('#change-text').fadeOut(400, function() {
                $(this).text(wordsArrayShirt[count % wordsArrayShirt.length]).fadeIn(400);
                document.getElementById('change-text').style.animationDelay = '0.5s';
            });
        }, 8000);
    });

    $(window).scroll(function() {
        var y = $(this).scrollTop();
        if (y > 700 && $(window).width() > 500) {
            $('.sidenavbar').fadeIn();
        } else {
            $('.sidenavbar').fadeOut();
        }
    });

    $('.mouse_scroll').click(function(e) {
        e.preventDefault();
        $('html, body').stop().animate({
            scrollTop: $(window).height(),
        }, 1300);
    });

    particlesJS.load('particles-js', 'javascripts/config/particles.json');
    particlesJS.load('particles-js-about', 'javascripts/config/particles-about.json');

    var dataRotate = ['developer', 'traveller', 'nap enthusiast', 'homo Sapien', 'buffet connoisseur'];
    var element = document.getElementsByClassName('txt-rotate')[0];
    new TxtRotate(element, dataRotate, 4000);


    var randomColorFactor = function() {
        return Math.round(Math.random() * 255);
    };
    var randomColor = function(opacity) {
        return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',' + opacity + ')';
    };

    var ctx = document.getElementById("myChart").getContext("2d");
    var data = {
        labels: ["Website Design", "Node", "Vue", "Javascript", "HTML & CSS", "React", "Ping Pong", "Music Production"],
        datasets: [{
                label: "Percieved Interest",
                backgroundColor: "rgba(43,176,212,.4)",
                borderColor: "rgba(43,176,212,1)",
                pointBackgroundColor: "rgba(43,176,212,1)",
                data: [100, 70, 85, 90, 95, 75, 90, 90]
            },
            {
                label: "Relative Skill",
                backgroundColor: "rgba(140,200,50,.4)",
                borderColor: "rgba(140,200,50,1)",
                pointBackgroundColor: "rgba(140,200,50,1)",
                data: [85, 75, 20, 80, 85, 60, 15, 50]
            }
        ]
    };

    new Chart(ctx, {
        type: 'radar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            defaultFontFamily: "'Open Sans', Calibri, Candara, Segoe, 'Segoe UI', Optima, Arial, sans-serif",
            defaultFontColor: "#99b",
            defaultFontSize: 14,

            legend: {
                display: false
            },

            layout: {
                padding: 20
            },

            scale: {
                scaleOverride: true,
                scaleLineColor: "rgba(200,200,200,.15)",
                ticks: {
                    scaleOverride: true,
                    scaleSteps: 10,
                    min: 0,
                    fontFamily: "'Open Sans', Calibri, Candara, Segoe, 'Segoe UI', Optima, Arial, sans-serif",
                    fontColor: "#99b",
                },
                pointLabels: {
                    fontFamily: "'Open Sans', Calibri, Candara, Segoe, 'Segoe UI', Optima, Arial, sans-serif",
                    fontColor: "#99b",
                    fontSize: 16,
                    padding: 10
                },
                gridLines: {
                    tickMarkLength: 0
                },
            },

            pointBackgroundColor: "rgba(200,200,250,.15)",
            pointRadius: 0,


            animationSteps: 30,
            animationEasing: "easeInOutExpo",

            angleShowLineOut: true,
            angleLineWidth: 1,
            pointDot: false,
        }
    });


    var ig = {};
    ig.token = '28940206.1677ed0.2f83218cc4644a699b42ac0bdf1147ec';

    ig.init = function() {
        $('.instagram').each(function(i) {
            var args = {};
            args.container = $(this);
            args.userid = '28940206';
            args.limit = args.container.data('limit');
            args.feedurl = 'https://api.instagram.com/v1/users/' + args.userid + '/media/recent/?access_token=' + ig.token + '&count=' + args.limit + '&callback=?';
            args.html = '';
            // PASS ARGS TO QUERY
            ig.query(args);
        });
    }

    ig.query = function(args) {
        $.getJSON(args.feedurl, {}, function(data) {
            // PASS QUERY DATA TO BUILDER
            ig.build(data, args);
        });
    }


    ig.build = function(data, args) {

        $.each(data.data, function(i, item) {
            if (item.caption) var caption = item.caption.text;
            var thumb = item.images.low_resolution.url;
            var img = item.images.standard_resolution.url;
            //get 1280 size photo [hack until avail in api]
            var hires = img.replace('s640x640', '1080x1080');
            args.html += '<a class="image" style="background-image: url(' + thumb + ');" data-img="' + hires + '">';
            if (caption) args.html += '<span class="caption">' + caption + '</span>';
            args.html += '</a>';
            // PASS TO OUTPUT
            ig.output(args);
        });
    }

    ig.output = function(args) {
        args.container.html(args.html);
    }

    ig.view = {
        viewer: $('.igviewer'),
        image: $('.igviewer img'),
        open: function(img) {
            ig.view.viewer.removeClass('hidden');
            ig.view.image.attr('src', img);
        },
        close: function() {
            ig.view.viewer.addClass('hidden');
            ig.view.image.attr('src', '');
        }
    }

    ig.init();

    //Listeners
    $('.instagram').on('click', '.image', function() {
        var img = this.dataset.img;
        ig.view.open(img);
    });
    $('.igviewer').on('click', function() {
        ig.view.close();
    });
});


function TxtRotate(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDevaring = false;
};



TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDevaring) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDevaring) {
        delta /= 2;
    }

    if (!this.isDevaring && this.txt === fullTxt) {
        delta = this.period;
        this.isDevaring = true;
    } else if (this.isDevaring && this.txt === '') {
        this.isDevaring = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $('#menu-center').find('a').each(function() {
        var currLink = $(this);
        var refElement = $(currLink.attr('href'));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#menu-center').find('ul li a').removeClass('active');
            currLink.addClass('active');
        } else {
            currLink.removeClass('active');
        }
    });
}

function divRender(parent, child) {
    $('#' + parent).prepend(
        $('<div class="' + child + '" />').css({
            position: 'absolute',
            top: Math.floor(Math.random() * 75) + 5 + '%',
            left: Math.floor(Math.random() * 100) + '%',
            opacity: Math.random() / 2 + 0.5,
        }));
}

function svgRender(parent, child, height) {
    $('#' + parent).prepend(
        $('<img src="' + child + '"/>').css({
            position: 'absolute',
            top: Math.floor(Math.random() * 80) + 5 + '%',
            left: Math.floor(Math.random() * 100) + '%',
            opacity: Math.random() / 2 + 0.25,
            height: height,
        })
    );
}
