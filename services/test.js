/**
 * Created by nikky on 12/5/14.
 */

var serviceBase = require("./base");
var _ = require("underscore");

var TestService = function() {
    var self = serviceBase("test");

    console.log("self: " + JSON.stringify(self));


    self.getItem = function (id, params) {
        return {
            id: "object.1",
            title: "Some Object",
            details: {
                many: "",
                x: 0,
                y: 5
            }
        };
    };

    self.getItems = function (params) {
        return [
            {
                id: "object.1",
                title: "Some Object"

            },

            {
                id: "object.2",
                title: "Another Object"

            }
        ]
    };


    self.actions = {
        "confirm": {
            displayName: "Confirm object",
            execute: self.confirm,
            isAvailable: canBeConfirmed
        }
    };

    self.updateItem = function (obj) {

    };

    self.deleteItem = function (id) {

    };

    self.confirm = function (id) {
        var item = self.getItem(id);
        item.isConfirmed = true;
        self.updateItem(item);
    };

    function canBeConfirmed(id) {
        var item = self.getItem(id);
        return !item.isConfirmed;
    }


    return self;
};

TestService.isPublic = true;

module.exports = TestService;