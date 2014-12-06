/**
 * Created by nikky on 12/5/14.
 */
var util = require("util");
var _ = require("underscore");

var serviceBase = module.exports = function(reference) {
    var self = {};

    self.reference = reference;

    self.generateClient = function() {
        var header = util.format("define(['./../factory'], function(factory) { var instance = factory.getInstance('%s');", self.reference);

        var rpc = _.map(self.actions, function(action, key) {
            return util.format("instance.%s = factory.getRPC('%s', '%s');", key, self.reference, key);
        });

        var footer = "return instance; });";

        return _.flatten([header, rpc, footer]).join("\n")
    };

    return self;
};

serviceBase.isPrivate = false;