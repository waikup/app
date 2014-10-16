var API = {
	host: 'http://35cb0e44.ngrok.com'
}

API.setToken = function(token) {}

API.req = function(method, endpoint, params, cb) {
	var xhr = new XMLHttpRequest()

	xhr.open(method, API.host+'/api'+endpoint, true)

	xhr.setRequestHeader("Content-Type", "application/json")
	xhr.setRequestHeader("X-User-Token", localStorage.getItem('token'))

	xhr.onreadystatechange = function() {
	    if (xhr.readyState !== 4) return
	    var err = (xhr.status == 200) ? false : true
		console.log(xhr.responseText)
	    cb(err, JSON.parse(xhr.responseText))
	}
	xhr.send(JSON.stringify(params))
}

API.getPlugins = function(cb) {
	cb(null, API.mock.plugins)
}

API.getAvailablePlugins = function(cb) {
	cb(null, API.mock.availablePlugins)
}

API.getPluginConfig = function(id, cb) {
	setTimeout(function() {
		cb(null, API.mock.pluginConfig)
	}, 500)
}

API.addPlugin = function(name, cb) {
	cb(null, null)
}

API.savePlugin = function(name, uuid, attr) {}

API.setOrder = function(array) {}

API.getTime = function(cb) {}

API.setTime = function(time) {}

API.encodeConfig = function(data) {
	var encoded = '#'
	for (var key in data) {
		encoded += (key + '=' + encodeURIComponent(JSON.stringify(data[key])) + '&')
	}
	encoded = encoded.substring(0, encoded.length - 1);
	return encoded
}

API.connectIbeacon = function(major, minor) {
	if (localStorage.getItem('major')) {
		var prevMajor = JSON.parse(localStorage.getItem('major')),
			prevMinor = JSON.parse(localStorage.getItem('minor'))
		if (prevMajor == major && prevMinor == minor)
			return
	}
	API.req('POST', '/connect', {major: major, minor: minor}, function(err, data) {
		console.log(err)
		console.log(data)
	})
}

API.mock = {}

API.mock.plugins = [
	{
		id: 'soundcloud',
		name: 'SoundCloud'
	},
	{
		id: 'news',
		name: 'News'
	}
]

API.mock.availablePlugins = [
	{
		id: 'soundcloud',
		name: 'SoundCloud'
	},
	{
		id: 'news',
		name: 'News'
	},
	{
		id: 'weather',
		name: 'Weather'
	}
]

API.mock.pluginConfig = {
	id: 'soundcloud',
	name: 'SoundCloud',
	str: 'holahola',
	int: 9
}