/**
 * Created by nikky on 12/6/14.
 */

define(["shared/BaseViewModel", "text!./templates/card.html"], function(BaseViewModel, template) {
    var PlayerCard = function(config) {
        var merged = _.extend({ fields: ["name"] }, config);
        var self = BaseViewModel(merged);

        self.title = "Player Card";

        self.isSelected = ko.observable(false);

        return self;
    };

    PlayerCard.componentName = "player-card";
    PlayerCard.template = template;

    BaseViewModel.extendedWith(PlayerCard);

    return PlayerCard;
});