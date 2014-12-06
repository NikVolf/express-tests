/**
 * Created by nikky on 12/6/14.
 */

define(["ko", "text!./templates/card.html"], function(ko, template) {
    var playerCard = {
        componentName: 'player-card',
        template: template,
        viewModel: function(options) {
            if (options.value && options.value.isViewModel)
                return options.value;

            var self = {};

            self.isViewModel = true;

            self.data = options.value;

            self.name = ko.observable(self.data.name);

            self.isEdited = ko.observable(false);

            self.edit = function () {
                self.isEdited(true);
            };

            return self;
        }
    };

    ko.components.register(playerCard.componentName, playerCard);

    return playerCard;
});