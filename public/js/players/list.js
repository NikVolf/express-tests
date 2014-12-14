/**
 * Created by nikky on 12/6/14.
 */
define(['shared/ListViewModel', "shared/behaviors/all", "api/players/client", 'text!./templates/list.html', 'shared/BaseViewModel'],
    function(ListViewModel, behaviors, api, template, BaseViewModel) {

        var PlayerList = function() {
            var collectionCfg = {
                "api": api,
                "viewModel": function() {
                    return BaseViewModel.create(["name"]).behavior(behaviors.listItem);
                }
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