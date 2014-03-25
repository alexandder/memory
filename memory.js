$(document).ready(function() {
	var images= ['images.jpeg', 'jupiter.jpg', 'mars.jpg', 'moon.jpg', 'saturn.jpg'];
	var cards = [];
	var clicksNumber = 0;
	
	for (var i = 0; i < 2*(images.length - 1); i++) {
		var nb = i + 1
		var card = '<div id="card' + nb + '"><img src="' + images[0] + '" alt=""></div>';
		cards[i] = card;
	};
	
	cards = shuffleArray(cards);
	var initialBox = '';

	for (var i = 0; i < cards.length; i++) {		
		initialBox += cards[i];
	};
	$('#gamebox').append(initialBox);

	var previouslySelectedNumber = 0;
	$('div[id^=card]').on('click', function(event) {
		event.preventDefault();
		clicksNumber++;
		var cardNumber = getCartNumber($(this));
		var imageToChange = '#card' + cardNumber + ' > img';
		
		if (clicksNumber % 2 === 1) {
			previouslySelectedNumber = cardNumber;
		}

		if (cardNumber > cards.length/2) {
			cardNumber -= cards.length/2;
		}
		
		changeImage(imageToChange, images[cardNumber], 0);	
		$('#clicksNumber').text('Number of clicks: ' + clicksNumber);

		if (clicksNumber % 2 === 0) {
			if ( (cardNumber - previouslySelectedNumber) % (cards.length/2) !== 0) {
				$('div[id^=card]').off('click');
				setTimeout(function() {
					changeImage(imageToChange, images[0], 0)
					var previousImage = '#card'	+ previouslySelectedNumber + ' > img';
					changeImage(previousImage, images[0], 0);
					$('div[id^=card]').on('click');
				}, 1000);
			}
		}
	});
});

var shuffleArray = function(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

var getCartNumber = function(selectedDiv) {
	var selectedDivId = selectedDiv.attr('id');
	var numberRegex = /\d+/;
	return selectedDivId.match(numberRegex);
}

var changeImage = function(imageToChange, newImage, delayTime) {
	$(imageToChange).attr('src', newImage).delay(delayTime);
}

var 
