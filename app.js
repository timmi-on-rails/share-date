function fix() {
	(function (w) {

		w.URLSearchParams = w.URLSearchParams || function (searchString) {
			var self = this;
			self.searchString = searchString;
			self.get = function (name) {
				var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(self.searchString);
				if (results == null) {
					return null;
				}
				else {
					return decodeURI(results[1]) || 0;
				}
			};
		}
	
	})(window)
}

function renderRoot(model) {
	if (model.mode == 'show') {
		return renderShowEvent(model.event)
	} else if (model.mode == '') {
		return renderCreateEvent()
	} else if (model.mode == 'error') {
		return renderError()
	}
}

function renderShowEvent(event) {
	const startDate = event.start.toLocaleDateString()
	const startTime = event.start.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })
	const endDate = event.end.toLocaleDateString()
	const endTime = event.end.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })

	var html = '<p class="center">' + event.description + '</p>' +
				'<div class="center">' + startDate + '</div>'

	if (startDate != endDate) {
		if (event.withTime) {
			html += '<div class="center">' + startTime + '</div>' +
					'<div class="center">-</div>' +
					'<div class="center">' + endDate + '</div>' +
					'<div class="center">' + endTime + '</div>'
		} else {
			html += '<div class="center">-</div>' +
			'<div class="center">' + endDate + '</div>'
		}
	} else if (event.withTime) {
		if (startTime != endTime) {
			html += '<div class="center">' + startTime + ' - ' + endTime + '</div>'
		} else {
			html += '<div class="center">' + startTime + '</div>'
		}
	}

	return html
}

function renderError() {
	return "<h1>Error</h1>"
}

function renderCreateEvent() {
	var event = {
	}

	return "<h1>Create Event</h1>" + 
			'<button onclick="replace(23)">Test</button>'
}

/*
function share() {
	if (navigator.share) {
	navigator.share({
			title: 'Web Fundamentals',
			text: 'Check out Web Fundamentals — it rocks!',
			url: 'data:application/octet-stream;charset=utf-16le;base64,//5mAG8AbwAgAGIAYQByAAoA'
	})
		.then(function() { alert('Successful share') })
		.catch(function(error) { alert(error) });
	} else alert('no share')
}
<button onclick="share()">share</button>
<a href="data:text/calendar;charset=utf-8,%3C%21DOCTYPE%20html%3E%0D%0A%3Chtml%20lang%3D%22en%22%3E%0D%0A%3Chead%3E%3Ctitle%3EEmbedded%20Window%3C%2Ftitle%3E%3C%2Fhead%3E%0D%0A%3Cbody%3E%3Ch1%3E42%3C%2Fh1%3E%3C%2Fbody%3E%0A%3C%2Fhtml%3E%0A%0D%0A">ics</a>

*/
