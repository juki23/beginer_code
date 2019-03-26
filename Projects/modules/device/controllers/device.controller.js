var app = angular.module('app.authentication.device.controller',[
	'app.authentication.device.list.controller',
	'app.authentication.device.update.controller'
]);

app.controller('deviceCtrl', function($scope, deviceService,$state,$rootScope){
	console.log("get in deviceCtrl");
});