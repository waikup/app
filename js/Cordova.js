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

BLE.onibeacon = function(beacon) {
	BLE.ibeacon = beacon
}

BLE.createDelegate = function() {
	return new cordova.plugins.locationManager.Delegate().implement({
	    didDetermineStateForRegion: function (result) {},
	    didStartMonitoringForRegion: function (result) {},
	    didRangeBeaconsInRegion: function (result) {
	    	if (result.beacons.length > 0)
	    		BLE.onibeacon(result.beacons[0])
	    }
	})
}

BLE.createBeaconRegion = function() {	
    var uuid = 'D9B9EC1F-3925-43D0-80A9-1E39D4CEA95D',
    	identifier = 'raspi'
    	// minor = 1000, // optional, defaults to wildcard if left empty
    	// major = 5 // optional, defaults to wildcard if left empty

    // return new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor)
    return new cordova.plugins.locationManager.BeaconRegion(identifier, uuid)
}