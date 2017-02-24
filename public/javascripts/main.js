$(document).ready(function() {
  for (var i = 1; i <= 2; i++) {
    svgRender("about", "images/svg/cloud.svg", "150px");
    svgRender("about", "images/svg/cloud-1.svg", "150px");
    svgRender("about", "images/svg/cloud-2.svg", "150px");
    svgRender("about", "images/svg/cloud.svg", "150px");
    divRender("about", "cloud8");

    divRender("skills", "cloud5");
    divRender("skills", "cloud6");
    svgRender("skills", "images/svg/cloud.svg", "150px");
  }

  // var feed = new Instafeed({
  //   get: 'user',
  //   userId: '28940206',
  //   clientId: 'b0bd23583f3f48f6a5c00eab0207f6b7',
  //   accessToken: '28940206.1677ed0.2f83218cc4644a699b42ac0bdf1147ec',
  //   resolution: 'low_resolution',
  //   limit: '12',
  //   template: '<a href="{{link}}"><img style="border:solid; border-color:white;" src="{{image}}" /></a>'
  // });
  // feed.run();

  $(document).on("scroll", onScroll);

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

  var stars = 400;
  var $stars = $(".stars");
  var r = 800;
  for (var i = 0; i < stars; i++) {
    var $star = $("<div/>").addClass("star");
    $stars.append($star);
  }

  var stars1 = 100;
  var $stars1 = $(".stars1");
  var r = 800;
  for (var i = 0; i < stars1; i++) {
    var $star1 = $("<div/>").addClass("star");
    $stars1.append($star1);
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


  var dataRotate = ["developer", "traveller", "nap enthusiast", "homo Sapien", "buffet connoisseur"];
  var element = document.getElementsByClassName('txt-rotate')[0];
  new TxtRotate(element, dataRotate, 4000);


  var randomColorFactor = function() {
    return Math.round(Math.random() * 255);
  };
  var randomColor = function(opacity) {
    return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ', 1.0)';
  };

  var frontEndChartConfig = {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [
          60,
          40,
          40,
          40
        ],
        backgroundColor: [
          randomColor(),
          randomColor(),
          randomColor(),
          randomColor()
        ],
        borderWidth: [0, 0, 0, 0]
      }],
      labels: [
        "HTML",
        "CSS/SCSS",
        "ReactJS",
        "AngularJS"
      ]
    },
    options: {
      defaultFontFamily: 'Open Sans',
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: 'bottom',
        fullWidth: 'true',
        labels: {
          fontSize: 14
        }
      },
      title: {
        display: true,
        text: 'Frontend Skill Set',
        fontSize: 20,
        fontFamily: 'Open Sans'
      },
      animation: {
        animateScale: true,
        animateRotate: true
      }
    }
  };
  var backEndChartConfig = {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [
          60,
          40,
          20,
          40
        ],
        backgroundColor: [
          randomColor(),
          randomColor(),
          randomColor()
        ],
        borderWidth: [0, 0, 0]
      }],
      labels: [
        "Javascript (ES6)",
        "NodeJS",
        "Database Solutions",
        "Express"
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: 'bottom',
        fullWidth: 'true',
        labels: {
          fontSize: 14
        }
      },
      title: {
        display: true,
        text: 'Backend Skill Set',
        fontSize: 20,
        fontFamily: 'Open Sans'
      },
      animation: {
        animateScale: true,
        animateRotate: true
      }
    }
  };
  var frontendctx = document.getElementById("frontEndSkillsChart").getContext("2d");
  var backendctx = document.getElementById("backEndSkillsChart").getContext("2d");
  new Chart(frontendctx, frontEndChartConfig);
  new Chart(backendctx, backEndChartConfig);
});


var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

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

function divRender(parent, child) {
  $("#" + parent).prepend(
    $('<div class="' + child + '" />').css({
      position: 'absolute',
      top: Math.floor(Math.random() * 75) + 5 + '%',
      left: Math.floor(Math.random() * 100) + '%',
      opacity: Math.random() / 2 + 0.5
    }));
}

function svgRender(parent, child, height) {
  $("#" + parent).prepend(
    $('<img src="' + child + '"/>').css({
      position: 'absolute',
      top: Math.floor(Math.random() * 80) + 5 + '%',
      left: Math.floor(Math.random() * 100) + '%',
      opacity: Math.random() / 2 + 0.25,
      height: height
    }));
}
