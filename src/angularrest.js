(function () {
    'use strict';

    angular.module('angularrest', []);

    angular.module('angularrest').service('AngularRest', function ($http) {
        function Model(object) {
            angular.extend(this, object);
        }
        Model.prototype.update = function (object) {
            return $http.patch(api + '/' + this.id, object).then(successCallback);
        }
        Model.prototype.delete = function () {
            return $http.delete(api + '/' + this.id).then(successCallback);
        }

        function successCallback(response) {
            if (angular.isArray(response.data) === true) {
                var models = [];
                for (var i = 0; i < response.data.length; i++) {
                    models.push(new Model(response.data[i]));
                }
                return models;
            }
            return new Model(response.data);
        }

        var service = this;
        var api = '/api/';

        service.make = function (dst, route) {
            api += route;
            angular.extend(dst, service);
        }
        service.all = function (params) {
            return $http.get(api, {params: params}).then(successCallback);
        };
        service.paginate = function (params) {
            return $http.get(api, {params: params}).then(successCallback);
        };
        service.find = function (id) {
            return $http.get(api + '/' + id).then(successCallback);
        };
        service.create = function (object) {
            return $http.post(api, object).then(successCallback);
        }
    });
})();
