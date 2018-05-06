let inProgress = false;
let button = $('button'),
	spinner = '<span class="spinner"></span>';

button.click(function() {
	if(document.getElementById("password").value !== "password") {
		log("wrong password");
		return;
	}
	let shatter = document.getElementById("shatter").checked;
	let flower = document.getElementById("flower").checked;
	let oil = document.getElementById("oil").checked;
	let kief = document.getElementById("kief").checked;
	let strain = document.getElementById("toggle-daynight").checked ? "sativa" : "indica";

	let method = '';
	let methodRadioGroup = document.getElementsByName('duration');
	for (var i = 0, length = methodRadioGroup.length; i < length; i++) {
		if (methodRadioGroup[i].checked) {
			// do whatever you want with the checked radio
			method = methodRadioGroup[i].value;
			break;
		}
	}

	let timestamp = Math.round((new Date()).getTime() / 1000);

	if (!button.hasClass('loading')) {
		button.toggleClass('loading');
		inProgress = true;
		setTimeout(function() {
			button.html(spinner);
		}, 600)
	} else {
		button.toggleClass('loading').html("Submit");
	}

	let params = {
		"body": {
			"tableName": "TrackingDataTable",
			"data": {
				"date_time": 3,
				"strain": strain,
				"method": method,
				"flower": flower,
				"shatter": shatter,
				"oil": oil,
				"kief": kief,
				"type": "Weed"
			},
			"operation": "create"
		}
	};

	post('https://ztap43d22k.execute-api.us-west-2.amazonaws.com/Production',
		JSON.stringify(params),
		function(data, status) {
			log(data, status);
			if (inProgress) {
				setTimeout(function() {
					button.toggleClass('loading').html("Submit");
				}, 600)
			}
		});

	log(flower, shatter, oil, kief, method, timestamp, strain);
})
