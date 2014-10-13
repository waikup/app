document.addEventListener("deviceready", function() {
	window.plugin.backgroundMode.enable()
})

var BLE = {}

BLE.error = console.log.bind(console)
