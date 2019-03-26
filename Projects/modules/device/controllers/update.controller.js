var app = angular.module('app.authentication.device.update.controller', []);

app.controller('devUpdateCtrl', DeviceUpdateController);

function DeviceUpdateController($scope, $rootScope, deviceService, toastr, $state, $stateParams) {
	console.log("get in device updateCtrl", $stateParams.iddev);
	$rootScope.btnHide = !$state.includes('authentication.device.list');
	var idDev = $stateParams.iddev;

	$scope.submitTime = 0;
	$scope.lsError = {};

	var resetData = function () {
		if (idDev) {
			deviceService.getDevice(idDev).then(function (response) {
				if (response.message === "success") {
					$scope.data = response.data[0];
				};
			}, function (err) {
				toastr.error('Error', 'Get device Error!');
				console.log("Get device Error", err);
			});
		} else {
			$scope.data = {
				id: "",
				device_name: "",
				artist: "",
			}
		};
	};

	resetData();

	$scope.saveDevice = function (data) {
		console.log("data", data);
		$scope.submitTime++;
		$scope.lsError = {};
		deviceService.validate(data).then(function (result) {
			if (result.message === "success") {
				$scope.submitTime = 0;

				var { id, device_name, artist } = $scope.data;
				var data = {
					id: id,
					device_name: device_name,
					artist: artist,
				};
				if (id) {
					data.update_time = new Date();
					deviceService.updateDevice(data).then(function (response) {
						if (response.message === "success") {
							toastr.success("Success", "Update device Success!");
							$state.go("authentication.device.list");
						};
					}, function (err) {
						toastr.error('Error', 'Update device Error!');
						console.log("Update device Error!", err);
					});
				} else {
					deviceService.insertDevice(data).then(function (response) {
						if (response.message === "success") {
							toastr.success("Success", "Insert device Success");
							$state.go("authentication.device.list");
						};
					}, function (err) {
						toastr.error("Error", "Insert device Error!");
						console.log("Insert device Error!");
					})
				}
			}
		}, function (err) {
			toastr.error('Please check data again!', 'Error');
			for (var i = 0; i < err.length; i++) {
				$scope.lsError[err[i].field] = [];
				$scope.lsError[err[i].field].msg = err[i].message;
			}
		});
	};

	$('.custom-file-input').on('change', function () {
		$scope.data.image = $(this).val();
		$(this).next('.form-control-file').addClass("selected").html($scope.data.image);
	})
};