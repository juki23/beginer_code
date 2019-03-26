var app = angular.module('app.authentication.device.list.controller', []);

app.controller('devListCtrl', DeviceListController);

function DeviceListController($scope, $rootScope, deviceService, toastr, $state) {
	$rootScope.btnHide = !$state.includes('authentication.device.list');

	$scope.totalItems = 0;
	$scope.currentPage = 1;
	$scope.pageSize = 3;

	$scope.getListDevices = function () {
		var data = {
			pageSize: $scope.pageSize,
			currentPage: $scope.currentPage
		};
		deviceService.getListDevices(data).then(function (response) {
			if (response.message === "success") {
				$scope.lsDev = response.data;
				console.log("", response.data);
				$scope.totalItems = $scope.lsDev[0].amount;
			};
		});
	};

	$scope.getListDevices();

	$scope.selectDevice = function (id) {
		$state.go("authentication.device.update", { iddev: id });
	};

	$scope.deleteDevice = function (id) {
		if (id) {
			let conf = confirm("Are you sure !");
			if (conf == true) {
				deviceService.deleteDevice(id).then(function (response) {
					if (response.message === "success") {
						toastr.success("Success", "Delete device Success!");
						$scope.getListDevices();
					};
				}, function (err) {
					toastr.error("Error", "Delete device Error!");
					console.log("Delete device Error!", err);
				});
			}
		};
	};

	$scope.pageChanged = function () {
		console.log('Page changed to: ' + $scope.currentPage);
		$scope.getListDevices();
	};
};