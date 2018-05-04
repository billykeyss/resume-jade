var radios = document.getElementsByName('genderS');

for (var i = 0, length = radios.length; i < length; i++) {
	if (radios[i].checked) {
		// do whatever you want with the checked radio
		console.log(radios[i].value);
		break;
	}
}
