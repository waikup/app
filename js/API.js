var API = {
	host: 'http://192.168.1.128:8080'
}

API.setToken = function(token) {}

API.req = function(method, endpoint, params, cb) {
	var xhr = new XMLHttpRequest()

	xhr.open(method, API.host+'/api'+endpoint, true)

	xhr.setRequestHeader("Content-Type", "application/json")
	xhr.setRequestHeader("X-User-Token", localStorage.getItem('token'))

	xhr.onreadystatechange = function() {
	    if (xhr.readyState !== 4) cb && cb(false)
	    var err = (xhr.status == 200) ? false : true
		console.log(xhr.responseText)
	    cb && cb(err, JSON.parse(xhr.responseText))
	}
	xhr.send(JSON.stringify(params))
}

var pluginStore = {}
API.getPlugins = function(cb) {
	API.req('GET', '/plugins/installed', null, function(err, data) {
		delete data.err
		delete data['']
		pluginStore = data
		if (err) return
		var plugins = []
		for (var id in data) {
			data[id].id = id
			if (id !== 'err' || id !== '')
				plugins.push(data[id])
		}
		cb(err, plugins)
	})
}

API.getAvailablePlugins = function(cb) {
	API.req('GET', '/plugins', null, function(err, data) {
		var plugins = []
		for(var id in data) {
			data[id].id = id
			plugins.push(data[id])
		}
		cb(err, plugins)
	})
}

API.savePlugins = function(cb) {
	API.req('POST', '/plugins/installed', {plugins: pluginStore}, cb)
}

API.addPlugin = function(name, cb) {
	cb(null, null)
}

API.getAlarm = function(cb) {
	API.req('GET', '/alarm', {}, cb)
}

API.enableAlarm = function(time) {
	API.req('POST', '/enable', {time: time}, null)
}

API.disableAlarm = function(time) {
	API.req('POST', '/disable', {}, null)
}

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
	API.req('POST', '/connect', {major: major, minor: minor}, cb)
}