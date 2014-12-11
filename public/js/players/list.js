/**
 * Created by nikky on 12/6/14.
 */
define(["api/players/client", 'text!./templates/list.html', './card'], function(api, template, playerCard) {

    var playerList = {
        viewModel: function() {
            var self = {};
            self.items = ko.observableArray();
            self.editable = ko.observable(true);

            self.populate = function(data) {
                _.each(data, self.push);
            };

            $.when(api.fetch()).then(self.populate);

            self.push = function(itemData) {
                self.items.push(playerCard.viewModel({ value: itemData }));
            };

            self.add = function() {
                var newModel = {
                    isNew: true,
                    name: "New Player"
                };
                api.save(newModel).then(self.push);
            };

            return self;
        },

        template: template,

        name: "player-list"
    };


    ko.components.register(playerList.name, {
        viewModel: playerList.viewModel,
        template: playerList.template
    });

    return playerList;

});