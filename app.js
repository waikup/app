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
	})

	API.getAvailablePlugins(function(err, plugins) {
		Template7.data['url:add.html'] = {plugins: plugins}
	})
}

if (localStorage.getItem('token'))
	initLogged()
else
	init()