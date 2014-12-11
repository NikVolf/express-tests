/**
 * Created by nikky on 12/5/14.
 */

define([], function() {
    function Instance(name) {
        var self = this;

        self.name = name;

        self.fetch = function(params) {
            var deferred = $.Deferred();

            if (_.isObject(params) || !params ) {
                $.ajax(
                    {
                        url: '/api/' + self.name,
                        type: "GET",
                        data: $.param(params || {}),
                        success: function (response) {
                            deferred.resolve(response);
                        }
                    });

                return deferred.promise();
            }

            $.ajax({
                url: '/api/' + self.name + "/" + params,
                type: "GET",
                data: $.param(params || {}),
                success: function (response) {
                    deferred.resolve(response);
                }
            });


            return deferred.promise();
        };

        self.save = function(item) {
            var deferred = $.Deferred();
            if (item.isNew)
            {
                $.ajax({
                    url: "api/" + self.name + "/",
                    type: "POST",
                    data: item,
                    success: function(response) {
                        deferred.resolve(response);
                    }
                });
                return deferred.promise();
            }

            $.ajax({
                url: "api/" + self.name + "/" + item.id,
                type: "PUT",
                data: item,
                success: function(response) {
                    deferred.resolve();
                }
            });

            return deferred.promise();
        }
    }

    function rpcInvoke(name, func, id, params) {
        var deferred = $.Deferred();
        $.ajax(
            {
                url: "/rpc/" + name + "/func/" + id,
                type: "POST",
                data: JSON.stringify(params),
                success: function (response) {
                    deferred.resolve(response);
                }
            });

        return deferred.promise();
    }

    return {
        getInstance: function(name) {
            return new Instance(name);
        },
        getRPC: function(name, func) {
            return function(id, params) {
                rpcInvoke(name, func, id, params);
            }.bind(this);
        }
    }
});