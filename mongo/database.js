/**
 * Created by nikky on 12/6/14.
 */

var _ = require("underscore");

var database = function(collections) {
    var self = {};
    var mongojs = require("mongojs");
    var databaseUrl = "web:webreadwrite@127.0.0.1/test1";

    self.open = function(collections) {
        collections = _.isArray(collections) ? collections : [collections];
        return mongojs.connect(databaseUrl, collections);
    };

    return collections ? self.open(collections) : self;
};

module.exports = database;

