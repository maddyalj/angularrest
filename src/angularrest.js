(function () {
    'use strict';

    angular.module('angularrest', []);

    angular.module('angularrest').factory('AngularRest', function ($http) {
        return function (dst, route) {
            var api = '/api/' + route;

            dst.all = function (params) {
                return $http.get(api, {params: params}).then(successCallback);
            };
            dst.paginate = function (params) {
                return $http.get(api, {params: params}).then(successCallback);
            };
            dst.find = function (id) {
                return $http.get(api + '/' + id).then(successCallback);
            };
            dst.create = function (object) {
                return $http.post(api, object).then(successCallback);
            }

            function Model(object) {
                angular.extend(this, object);
            }
            Model.prototype.update = function () {
                return $http.patch(api + '/' + this.id, this).then(successCallback);
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
        };
    });
})();
