$(document).ready(function() {
  $(document).on("scroll", onScroll);

  //smoothscroll
  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    $(document).off("scroll");

    $('a').each(function() {
      $(this).removeClass('active');
    })
    $(this).addClass('active');

    var target = this.hash,
      menu = target;
    $target = $(target);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top + 2
    }, 500, 'swing', function() {
      window.location.hash = target;
      $(document).on("scroll", onScroll);
    });
  });

  $(function() {
    count = 0;
    wordsArray = ["Developer", "Traveller", "Nap Enthusiast", "Homo Sapien", "Buffet Connoisseur"];
    setInterval(function() {
      count++;
      $("#word").fadeOut(400, function() {
        $(this).text(wordsArray[count % wordsArray.length]).fadeIn(400);
      });
    }, 4000);
  });

  $(document).scroll(function() {
    var y = $(this).scrollTop();
    if (y > 700 && $(window).width() > 500) {
      $('.sidenavbar').fadeIn();
    } else {
      $('.sidenavbar').fadeOut();
    }
  });

  $(".mouse_scroll").click(function(e) {
    e.preventDefault();
    console.log('test');
    $('html, body').stop().animate({scrollTop: $(window).height()}, 1300);
  });

});

function onScroll(event) {
  var scrollPos = $(document).scrollTop();
  $('#menu-center a').each(function() {
    var currLink = $(this);
    var refElement = $(currLink.attr("href"));
    if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
      $('#menu-center ul li a').removeClass("active");
      currLink.addClass("active");
    } else {
      currLink.removeClass("active");
    }
  });
}
