$(document).ready(function() {
  var cloudColor = ["#d7d7d7", "#e0e0e0", "#F6F3F2", "#e9e9e9", "#e4e4e4", "#bdbdbd"];

  for (var i = 1; i <= 3; i++) {
    // divRender("about", "cloud4");
    // $("#about").prepend(
    //   $('<div class="cloud4" />').css({
    //     position: 'absolute',
    //     top: Math.floor(Math.random() * 55) + 5 + '%',
    //     left: Math.floor(Math.random() * 100) + '%',
    //     'background-color': cloudColor[Math.floor(Math.random() * 5)]
    //   }));
    //
    // $("#about").prepend(
    //   $('<div class="cloud5" />').css({
    //     position: 'absolute',
    //     top: Math.floor(Math.random() * 55) + 5 + '%',
    //     left: Math.floor(Math.random() * 100) + '%',
    //     'background-color': cloudColor[Math.floor(Math.random() * 5)]
    //   }));
    //
    // $("#about").prepend(
    //   $('<div class="cloud6" />').css({
    //     position: 'absolute',
    //     top: Math.floor(Math.random() * 55) + 5 + '%',
    //     left: Math.floor(Math.random() * 100) + '%'
    //   }));

    $("#skills").prepend(
      $('<div class="cloud4" />').css({
        position: 'absolute',
        top: Math.floor(Math.random() * 55) + 5 + '%',
        left: Math.floor(Math.random() * 100) + '%',
        'background-color': cloudColor[Math.floor(Math.random() * 5)]
      }));

    $("#skills").prepend(
      $('<div class="cloud5" />').css({
        position: 'absolute',
        top: Math.floor(Math.random() * 55) + 5 + '%',
        left: Math.floor(Math.random() * 100) + '%',
        'background-color': cloudColor[Math.floor(Math.random() * 5)]
      }));

    $("#skills").prepend(
      $('<div class="cloud6" />').css({
        position: 'absolute',
        top: Math.floor(Math.random() * 55) + 5 + '%',
        left: Math.floor(Math.random() * 100) + '%'
      }));
  }

  var feed = new Instafeed({
    get: 'user',
    userId: '28940206',
    clientId: 'b0bd23583f3f48f6a5c00eab0207f6b7',
    accessToken: '28940206.1677ed0.2f83218cc4644a699b42ac0bdf1147ec',
    resolution: 'low_resolution',
    limit: '12',
    template: '<a href="{{link}}"><img style="margin:20px" src="{{image}}" /></a>'
  });
  feed.run();

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
    wordsArray = ["developer", "traveller", "nap enthusiast", "homo Sapien", "buffet connoisseur"];
    setInterval(function() {
      count++;
      $("#word").fadeOut(400, function() {
        $(this).text(wordsArray[count % wordsArray.length]).fadeIn(400);
      });
    }, 4000);
  });

  $(function() {
    count = 0;
    wordsArrayShirt = ["CSS", "HTML", "JS", "Node"];
    setInterval(function() {
      count++;
      $("#change-text").fadeOut(400, function() {
        $(this).text(wordsArrayShirt[count % wordsArrayShirt.length]).fadeIn(400);
        document.getElementById("change-text").style.animationDelay = "0.5s";
      });
    }, 8000);
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
    $('html, body').stop().animate({
      scrollTop: $(window).height()
    }, 1300);
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

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

// function divRender(parent, child) {
//   $("#" + parent).prepend(
//     $('<div class="' + child '" />').css({
//       position: 'absolute',
//       top: Math.floor(Math.random() * 60) + 5 + '%',
//       left: Math.floor(Math.random() * 100) + '%',
//       'background-color': cloudColor[Math.floor(Math.random() * 5)]
//     }));
//   return;
// }
