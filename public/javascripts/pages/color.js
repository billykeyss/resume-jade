const COLOR_MIND_URL = "http://colormind.io/api/";

let $hex = $('#hex'),
	$rgb = $('#rgb'),
	$body = $('body');

/**
 * generatePaletteFromInput - creates a color palette from user
 *
 * @param  {sting} r red value
 * @param  {sting} g green value
 * @param  {sting} b blue vale
 * @return {void}   description
 */
function generatePaletteFromInput(r,g,b) {
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
	let http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if (http.readyState == 4 && http.status == 200) {
			let palette = JSON.parse(http.responseText).result;
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
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function hashColour() {
	let url, urlHash, urlColour;
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

			$body.css('background-color', $rgb.val());
			$body.colourBrightness();
		} else {
			$hex.focus();
		}
	}
}

window.onhashchange = hashColour;
hashColour();

$hex.bind('blur keyup', function(e) {
	colour = $.rgbHex($hex.val());

	if (colour) {
		$rgb.val(colour);
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
	colour = $.rgbHex($rgb.val());

	if (colour) {
		$hex.val(colour);
		$('body').css('background-color', $hex.val());
		$('body').colourBrightness();
	} else {
		$hex.val('');
	}

	if (e.keyCode == 13) {
		$hex.select();
	}
});

$('#generate').click(function(e) {
	if($rgb.val() !== '') {
		let hex = $hex.val();
		generatePaletteFromInput(hex.substring(0, 1), hex.substring(2, 3), hex.substring(4, 5));
	} else {
		generateColorPalette();
	}
})

$('body').css('background-color', getRandomColor());
$('body').colourBrightness();

function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
