/**
 * Created by nikky on 12/6/14.
 */

define(["shared/BaseViewModel", "shared/behaviors/all", "text!./templates/card.html"], function(BaseViewModel, behaviors, template) {
    var PlayerCard = function(config) {
        var merged = _.extend(
            {
                fields: ["name", "age", "experience"]
            },
            config);
        var self = BaseViewModel(merged);

        return self;
    };

    PlayerCard.componentName = "player-card";
    PlayerCard.template = template;

    BaseViewModel.extendedWith(PlayerCard);

    return PlayerCard;
});