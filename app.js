function _base64ToArrayBuffer(base64, offset = 0) {
	var binary_string =  atob(base64);
	var len = binary_string.length;
	var bytes = new Uint8Array( len - offset );

	for (var i = offset; i < len; i++)        {
		 bytes[i-offset] = binary_string.charCodeAt(i);
	}
	return bytes.buffer;
}

function renderShow() {
	return "<a>test</a>";
}