/**
 * Created by natala on 14.12.14.
 */


var players = require("../services/players");

describe("Players service", function() {

    var service = new players();

    it("can return players", function(done) {
        service.getItems().then(function(result) {
            assert.equal(result[0], "new player");
            done();
        });
    });
});