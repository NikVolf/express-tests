/**
 * Created by nikky on 12/6/14.
 */
define(['shared/ListViewModel', "api/players/client", 'text!./templates/list.html', './card'],
    function(ListViewModel, api, template, PlayerCard) {

        var PlayerList = function() {
            var collectionCfg = {
                "api": api,
                "viewModel": PlayerCard
            };

            var self = ListViewModel(collectionCfg);

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

        ListViewModel.extendedWith(PlayerList);

        return PlayerList;

    });