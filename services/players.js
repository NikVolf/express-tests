/**
 * Created by nikky on 12/6/14.
 */

var mongoServiceBase = require("./mongo");

var playersService = module.exports = function() {
    return mongoServiceBase("players");
};