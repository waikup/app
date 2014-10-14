document.addEventListener("deviceready", function() {
	BLE.init()
	window.plugin.backgroundMode.enable()
})

var BLE = {
	logs: []
}

BLE.init = function() {
	var delegate = BLE.createDelegate(),
		beaconRegion = BLE.createBeaconRegion()
		
	cordova.plugins.locationManager.setDelegate(delegate)
	// detect if iOS and call cordova.plugins.locationManager.requestWhenInUseAuthorization()
	cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion).fail(console.error.bind(console)).done()
	cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion).fail(console.error.bind(console)).done()
}

BLE.error = console.log.bind(console)

BLE.createDelegate = function() {
	return new cordova.plugins.locationManager.Delegate().implement({
	    didDetermineStateForRegion: function (pluginResult) {
	        BLE.logs.push({e: 'didDetermineStateForRegion', data: pluginResult})
	        cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult))
	    },
	    didStartMonitoringForRegion: function (pluginResult) {
	    	BLE.logs.push({e: 'didStartMonitoringForRegion', data: pluginResult})
	    },
	    didRangeBeaconsInRegion: function (pluginResult) {
	    	BLE.logs.push({e: 'didRangeBeaconsInRegion', data: pluginResult})
	    }
	})
}

BLE.createBeaconRegion = function() {	
    var uuid = 'DA5336AE-2042-453A-A57F-F80DD34DFCD9',
    	identifier = 'beaconAtTheMacBooks'
    	// minor = 1000, // optional, defaults to wildcard if left empty
    	// major = 5 // optional, defaults to wildcard if left empty

    // return new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor)
    return new cordova.plugins.locationManager.BeaconRegion(identifier, uuid)
}