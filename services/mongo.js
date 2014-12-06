/**
 * Created by nikky on 12/6/14.
 */

var serviceBase = require("./base");
var database = require("./../mongo/database");
var q = require("q");
var _ = require("underscore");
var mongojs = require("mongojs");

var mongoServiceBase = module.exports = function(reference, collection) {
    var self = serviceBase(reference);

    self.collection = collection || reference;
    self.db = database(self.collection);

    self.getItems = function() {
        var defer = q.defer();
        self.db[self.collection].find({}, function(error, items) {
            defer.resolve(items);
        });
        return defer.promise;
    };

    self.createItem = function(data) {
        var defer = q.defer();

        var mongoData = _.clone(data);
        mongoData._id = new mongojs.ObjectId();

        self.db[self.collection].save(mongoData, function() {

        });
    };

    self.getItem = function(id) {
        var defer = q.defer();

    };

    return self;
};

mongoServiceBase.isPrivate = true;
