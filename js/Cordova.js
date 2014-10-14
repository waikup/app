document.addEventListener("deviceready", function() {
	console.log(window.plugin)
	window.plugin.backgroundMode.enable()
})

var BLE = {}

BLE.init = function() {
	BLE.createBeaconRegion()
	BLE.createDelegate()
	cordova.plugins.locationManager.setDelegate(BLE.delegate)
	cordova.plugins.locationManager.requestWhenInUseAuthorization()
	cordova.plugins.locationManager.startMonitoringForRegion(BLE.beaconRegion).fail(console.error).done()
}

BLE.error = console.log.bind(console)

BLE.createDelegate = function() {

	BLE.delegate = new cordova.plugins.locationManager.Delegate().implement({

	    didDetermineStateForRegion: function (pluginResult) {

	        alert('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult))

	        cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult))
	    },

	    didStartMonitoringForRegion: function (pluginResult) {
	        console.log('didStartMonitoringForRegion:', pluginResult)

	        alert('didStartMonitoringForRegion:' + JSON.stringify(pluginResult))
	    },

	    didRangeBeaconsInRegion: function (pluginResult) {
	        alert('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult))
	    }
	})
}

BLE.createBeaconRegion = function() {	
    var uuid = 'DA5336AE-2042-453A-A57F-F80DD34DFCD9',
    	identifier = 'beaconAtTheMacBooks'
    	// minor = 1000, // optional, defaults to wildcard if left empty
    	// major = 5 // optional, defaults to wildcard if left empty

    BLE.beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor)
}