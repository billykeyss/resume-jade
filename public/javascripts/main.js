$(document).ready(function() {
  var cloudColor = ["#d7d7d7", "#e0e0e0", "#F6F3F2", "#e9e9e9", "#e4e4e4", "#bdbdbd"];

  for (var i = 1; i <= 2; i++) {
    $("#about").prepend(
      $('<img src="images/svg/cloud.svg" />').css({
        position: 'absolute',
        top: Math.floor(Math.random() * 80) + 5 + '%',
        left: Math.floor(Math.random() * 100) + '%',
        opacity: Math.random()/2 + 0.25,
      }));
    $("#about").prepend(
      $('<img src="images/svg/cloud-1.svg" />').css({
        position: 'absolute',
        top: Math.floor(Math.random() * 80) + 5 + '%',
        left: Math.floor(Math.random() * 100) + '%',
        opacity: Math.random()/2 + 0.25,
        height:"150px"
      }));
    $("#about").prepend(
      $('<div class="cloud8" />').css({
        position: 'absolute',
        top: Math.floor(Math.random() * 80) + 5 + '%',
        left: Math.floor(Math.random() * 100) + '%',
        opacity: Math.random()/2 + 0.25,
      }));
    $("#about").prepend(
      $('<img src="images/svg/cloud-2.svg" />').css({
        position: 'absolute',
        top: Math.floor(Math.random() * 80) + 5 + '%',
        left: Math.floor(Math.random() * 100) + '%',
        opacity: Math.random()/2 + 0.25,
      }));
    $("#skills").prepend(
      $('<div class="cloud5" />').css({
        position: 'absolute',
        top: Math.floor(Math.random() * 75) + 5 + '%',
        left: Math.floor(Math.random() * 100) + '%',
        'background-color': cloudColor[Math.floor(Math.random() * 5)],
        opacity: Math.random()/2 + 0.6
      }));

    $("#skills").prepend(
      $('<div class="cloud6" />').css({
        position: 'absolute',
        top: Math.floor(Math.random() * 75) + 5 + '%',
        left: Math.floor(Math.random() * 100) + '%',
        opacity: Math.random()/2 + 0.5
      }));
    $("#skills").prepend(
      $('<img src="images/svg/cloud.svg" />').css({
        position: 'absolute',
        top: Math.floor(Math.random() * 80) + 5 + '%',
        left: Math.floor(Math.random() * 100) + '%',
        opacity: Math.random()
      }));
  }

  var feed = new Instafeed({
    get: 'user',
    userId: '28940206',
    clientId: 'b0bd23583f3f48f6a5c00eab0207f6b7',
    accessToken: '28940206.1677ed0.2f83218cc4644a699b42ac0bdf1147ec',
    resolution: 'low_resolution',
    limit: '12',
    template: '<a href="{{link}}"><img style="border:solid; border-color:white;" src="{{image}}" /></a>'
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

  $(window).scroll(function() {
    var y = $(this).scrollTop();
    if (y > 700 && $(window).width() > 500) {
      $('.sidenavbar').fadeIn();
    } else {
      $('.sidenavbar').fadeOut();
    }
  });

  $(".mouse_scroll").click(function(e) {
    e.preventDefault();
    $('html, body').stop().animate({
      scrollTop: $(window).height()
    }, 1300);
  });

  var stars = 800;
  var $stars = $(".stars");
  var r = 800;
  for (var i = 0; i < stars; i++) {
    var $star = $("<div/>").addClass("star");
    $stars.append($star);
  }
  $(".star").each(function() {
    var cur = $(this);
    var s = 0.2 + (Math.random() * 1);
    var curR = r + (Math.random() * 300);
    cur.css({
      transformOrigin: "0 0 " + curR + "px",
      transform: " translate3d(0,0,-" + curR + "px) rotateY(" + (Math.random() * 360) + "deg) rotateX(" + (Math.random() * -50) + "deg) scale(" + s + "," + s + ")"

    })
  })


  function skillSet() {
  // Iterate over each element w/ a class of
  // bar-info, storing the value of data-total
  // in a variable.  Using jQuery's CSS method,
  // dynamically update the width of each bar.
  $('.bar-info').each(function() {
    total = $(this).data("total");
    $(this).css("width", total + "%");
  });

  // Iterate over each element w/ the class percent.  Using
  // jQuery's $(this) will allow us to interact w/ each specific
  // object in the loop.  Then use jQuery's super awesome animate method
  // to implement a counter on each .percent element, which will "count"
  // up incrementally until it reaches the number inside the percent span,
  // aka it's "ceiling".
  $('.percent').each(function() {
    var $this = $(this);
    $({
      Counter: 10
    }).animate({
      Counter: $this.text()
    }, {
      duration: 1000,
      easing: 'swing',
      step: function() {
        $this.text(Math.ceil(this.Counter) + "%");
      }
    });
  });
};
// Invoke our skillSet function inside a setTimeout,
// to create a short delay before the animation begins.
setTimeout(skillSet, 1000);


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
