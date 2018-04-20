const COLOR_MIND_URL = "http://colormind.io/api/";

function getRecommendedColor(r,g,b) {
	sendPostRequest({
		model: "default",
		input: [
			[r, g, b], "N", "N", "N", "N"
		]
	});
}

function generateColorPalette() {
	sendPostRequest({
		model: "default",
		input: ["N", "N", "N", "N", "N"]
	});
}

function sendPostRequest(data) {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if (http.readyState == 4 && http.status == 200) {
			var palette = JSON.parse(http.responseText).result;
			updatePalette(palette);
		}
	}
	http.open("POST", COLOR_MIND_URL, true);
	http.send(JSON.stringify(data));
}

function updatePalette(palette) {
	$("#palette").css('display', 'block');
	$(".palette").each(function(index) {
		$(this).css('background-color', "rgb(" + palette[index][0] + "," + palette[index][1] + "," + palette[index][2] + ")");
		$(this).children().text(rgbToHex(palette[index][0], palette[index][1], palette[index][2]));
		$(this).children().colourBrightness();
	});
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function hashColour() {
	var url, urlHash, urlColour;
	url = window.location.href;
	urlHash = window.url('#', url);

	if (window.url('#', url)) {
		urlColour = window.url('#', url);
	} else {
		urlColour = window.url('-1', url);
	}

	if (urlColour) {
		if (urlColour.match('^[0-9A-Fa-f]{3}$') || urlColour.match('^[0-9A-Fa-f]{6}$')) {
			$hex.val('#' + urlColour);

			colour = $.rgbHex($hex.val());

			if (colour) {
				$rgb.val(colour);
				$rgb.select();
			} else {
				$rgb.val('');
			}

			$('body').css('background-color', $rgb.val());
			$('body').colourBrightness();
		} else {
			$hex.focus();
		}
	}
}

var $hex = $('#hex'),
	$rgb = $('#rgb'),
	$hex_val = $('#hex').val(),
	$rgb_val = $('#rgb').val();

window.onhashchange = hashColour;
hashColour();

$hex.bind('blur keyup', function(e) {
	colour = $.rgbHex($('#hex').val());

	if (colour) {
		$('#rgb').val(colour);
		$('body').css('background-color', $rgb.val());
		$('body').colourBrightness();
	} else {
		$('#rgb').val('');
	}

	if (e.keyCode == 13) {
		$rgb.select();
	}
});

$rgb.bind('blur keyup', function(e) {
	colour = $.rgbHex($('#rgb').val());

	if (colour) {
		$('#hex').val(colour);
		$('body').css('background-color', $hex.val());
		$('body').colourBrightness();
	} else {
		$('#hex').val('');
	}

	if (e.keyCode == 13) {
		$hex.select();
	}
});

$('#generate').click(function(e) {
	if($('#rgb').val() == '') {
		// getRecommendedColor(); TODO: IMPLEMENT RECOMMENDATION BASED ON COLOR
		generateColorPalette();
	} else {
		generateColorPalette();
	}
})

$('body').css('background-color', getRandomColor());
$('body').colourBrightness();

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
