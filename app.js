function _base64ToArrayBuffer(base64, offset) {
	var binary_string =  atob(base64);
	var len = binary_string.length;
	var bytes = new Uint8Array( len - offset );

	for (var i = offset; i < len; i++)        {
		 bytes[i-offset] = binary_string.charCodeAt(i);
	}
	return bytes.buffer;
}

function param2event(param) {
	const binary = new DataView(_base64ToArrayBuffer(decodeURIComponent(param), 0))

	// TODO checksum against accidental changes?
	const version = binary.getUint8(0)
	const start = new Date(binary.getUint32(1) * 1000)
	const end = new Date(binary.getUint32(5) * 1000)
	const withTime = (binary.getUint8(9) == 0)
	const description = String.fromCharCode.apply(null, new Uint8Array(_base64ToArrayBuffer(param, 10)))

	return {
		start: start,
		end: end,
		description: description,
		withTime: withTime
	}
}

function renderBody(search) {
	const urlParams = new URLSearchParams(search)
	const data = urlParams.get('data')

	if (data) {
		try {
			var event = param2event(data)
			return renderShowEvent(event)
		} catch(error) {
			return renderError()
		}
	} else {
		return renderCreateEvent()
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
	return "<h1>Create Event</h1>"
}