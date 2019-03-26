angular.module('app.authentication.device.service', [])
    .factory("deviceService", function (Restangular, $q) {

        var services = {};
        var api = Restangular.all('api');

        services.getListDevices = function (data) {
            return api.all('/device/getAllDevices').post({ data: data });
        };

        services.getDevice = function (id) {
            return api.one('/device/getDevice/' + id).get();
        };

        services.deleteDevice = function (id) {
            return api.one('/device/deleteDevice/', id).remove();
        };

        services.insertDevice = function (data) {
            var insertDevices = api.all("/device/insertDevice");
            return insertDevices.post({ data: data });
        };

        services.updateDevice = function (data) {
            var updateDevices = api.all("/device/updateDevice");
            return updateDevices.customPUT({ data: data });
        };

        services.validate = function (data) {
            var error = [];
            var q = $q.defer();
            if (data) {
                try {
                    //validate device_name
                    if (data.device_name) {
                        if (data.device_name.length < 0 || data.device_name.length > 200) {
                            error.push({ field: "device_name", message: "max length" });
                        }
                    }
                    else {
                        error.push({ field: "device_name", message: "required" });
                    }
                    if (error.length > 0) {
                        throw error;
                    }
                    else {
                        q.resolve({ message: 'success' });
                    }
                }
                catch (error) {
                    q.reject(error);
                }
            };
            return q.promise;
        };

        return services;
    });
