/**
 * Created by nikky on 12/6/14.
 */
define(['shared/CollectionViewModel', "api/players/client", 'text!./templates/list.html', './card'],
    function(CollectionViewModel, api, template, PlayerCard) {

        var PlayerList = function() {
            var collectionCfg = {
                "api": api,
                "viewModel": PlayerCard
            };

            var self = CollectionViewModel(collectionCfg);

            self.itemDefaults = {
                name: "New Player"
            };

            self.editable = ko.observable(true);

            self.entry = function() {
                self.fetch();
            };

            return self;
        };

        PlayerList.componentName = "player-list";
        PlayerList.template = template;

        CollectionViewModel.extendedWith(PlayerList);

        return PlayerList;

    });