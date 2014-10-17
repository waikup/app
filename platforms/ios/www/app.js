var config = {
   	template7Pages: true,
   	swipePanel: 'left',
   	onAjaxStart: function (xhr) {
   		app.showIndicator()
    },
    onAjaxComplete: function (xhr) {
        app.hideIndicator()
    }
}

var app = new Framework7(config),
   $$ = Dom7

var mainView = app.addView('.view-main', {
   dynamicNavbar: true
})

function init() {
	$$('a[href="landing.html"]').click()
}

function initLogged() {

	API.getPlugins(function(err, plugins) {
		Template7.data['page:main'] = {plugins: plugins}
		$$('a[href="main.html"]').click()

		API.getAlarm(function(err, data) {
			if (!data) return
			$$('#enableAlarm')[0].checked = JSON.parse(data.enable)
			var time = data.time.toString()
			if (time.length == 3) time = '0'+time
			time = time.substring(0,2) + ':' + time.substring(2,4)
			$$('#time')[0].value = time
		})
	})

	API.getAvailablePlugins(function(err, plugins) {
		Template7.data['url:add.html'] = {plugins: plugins}
	})
}

if (localStorage.getItem('token'))
	initLogged()
else
	init()