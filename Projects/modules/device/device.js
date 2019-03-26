var app = angular.module('app.authentication.device', [
	'app.authentication.device.controller',
	'app.authentication.device.service'
]);

app.config(function ($stateProvider) {
	$stateProvider.state('authentication.device', {
		abstract: true,
		url: '/device',
		data: { pageTitle: 'Device-manager' },
		templateUrl: 'modules/device/views/index.html',
		controller: 'deviceCtrl',
	}).state('authentication.device.list', {
		url: '/list',
		data: { pageTitle: 'Device-manager' },
		templateUrl: 'modules/device/views/list.html',
		controller: 'devListCtrl',
	}).state('authentication.device.update', {
		url: '/update/:iddev',
		data: { pageTitle: 'Device-manager Update' },
		templateUrl: 'modules/device/views/update.html',
		controller: 'devUpdateCtrl',
	});
});