var API = {
	host: 'http://localhost:8888'
}

API.setToken = function(token) {}

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

API.getTime = function(cb) {
	$.getJSON(API.host+'/api/time', function(data) {
		cb(data['time'])
	})
}

API.setTime = function(time) {
	$.post(API.host+'/api/time', {'time': time})
}

API.encodeConfig = function(data) {
	var encoded = '#'
	for (var key in data) {
		encoded += (key + '=' + encodeURIComponent(JSON.stringify(data[key])) + '&')
	}
	encoded = encoded.substring(0, encoded.length - 1);
	return encoded
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