document.addEventListener("deviceready", function() {
    window.plugin.backgroundMode.enable()
	BLE.init()
	
})

var BLE = {
	logs: []
}

BLE.init = function() {
	var delegate = BLE.createDelegate(),
		beaconRegion = BLE.createBeaconRegion()
    
    cordova.plugins.locationManager.requestAlwaysAuthorization()
	cordova.plugins.locationManager.setDelegate(delegate)
	cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion).fail(console.error.bind(console)).done()
	cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion).fail(console.error.bind(console)).done()
}

BLE.error = console.log.bind(console)

BLE.onibeacon = function(beacon) {
	BLE.ibeacon = beacon
	console.log(beacon)
	API.connectIbeacon(beacon.major, beacon.minor)
}

BLE.createDelegate = function() {
	return new cordova.plugins.locationManager.Delegate().implement({
	    didDetermineStateForRegion: function (result) {},
	    didStartMonitoringForRegion: function (result) {},
        didChangeAuthorizationStatus: function(result) {
        },
	    didRangeBeaconsInRegion: function (result) {

            if (result.beacons.length > 0)
	    		BLE.onibeacon(result.beacons[0])
	    }
	})
}

BLE.createBeaconRegion = function() {	
    var uuid = 'D9B9EC1F-3925-43D0-80A9-1E39D4CEA95D',
    	identifier = 'raspi'

    return new cordova.plugins.locationManager.BeaconRegion(identifier, uuid)
}