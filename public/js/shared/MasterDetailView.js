/**
 * Created by natala on 13.12.14.
 */
define(['./BaseViewModel', './ListViewModel'], function(BaseViewModel, ListViewModel) {

    var MasterDetailView = function(config) {
        var self = BaseViewModel(config);
        self.__base = _.clone(self);

        self.detailsViewModel = config.detailsViewModel;
        self.details = new self.detailsViewModel({ api: self.api });

        self.listViewModel = config.listViewModel;
        self.list = new self.listViewModel( { api: self.api });

        self.list.selected.subscribe(function(newObj) {
            var id = newObj.id();
            self.details.init(id);
        });
    };

    BaseViewModel.extendedWith(MasterDetailView);

    return MasterDetailView;

});