/**
 * Created by nikky on 12/6/14.
 */

define(["shared/BaseViewModel", "text!./templates/card.html"], function(BaseViewModel, template) {
    var PlayerCard = function(config) {
        var self = BaseViewModel({
            fields: ["name"]
        });

        self.title = "Player Card";

        return self;
    };

    PlayerCard.componentName = "player-card";
    PlayerCard.template = template;

    BaseViewModel.extendedWith(PlayerCard);

    return PlayerCard;
});