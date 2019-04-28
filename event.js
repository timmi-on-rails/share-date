function base64ToArrayBuffer(base64, offset) {
	var binary_string =  atob(base64);
	var len = binary_string.length;
	var bytes = new Uint8Array( len - offset );

	for (var i = offset; i < len; i++)        {
		 bytes[i-offset] = binary_string.charCodeAt(i);
	}
	return bytes.buffer;
}

// TODO create event with factory?!

function param2event(param) {
	const binary = new DataView(base64ToArrayBuffer(decodeURIComponent(param), 0))

	// TODO checksum against accidental changes? Fletcher-16 algo -> throw exception
	const version = binary.getUint8(0)
	const start = new Date(binary.getUint32(1) * 1000)
	const end = new Date(binary.getUint32(5) * 1000)
	const withTime = (binary.getUint8(9) == 0)
	const description = String.fromCharCode.apply(null, new Uint8Array(base64ToArrayBuffer(param, 10)))

	return {
		start: start,
		end: end,
		description: description,
		withTime: withTime
	}
}
