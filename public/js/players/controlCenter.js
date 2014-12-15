/**
 * Created by natala on 14.12.14.
 */

define(['api/players/client', 'shared/MasterDetailView', './list', './card', 'text!./templates/list.html'],
    function(api, MasterDetailView, PlayerList, PlayerCard, template) {

        var PlayerControlCenter = function () {
            var self = MasterDetailView({
                api: api,
                listViewModel: PlayerList,
                detailsViewModel: PlayerCard
            })
        };

        PlayerControlCenter.componentName = 'players-control-center';
        PlayerControlCenter.template = template;

        MasterDetailView.extendedWith(PlayerControlCenter);

        return PlayerControlCenter;


    });