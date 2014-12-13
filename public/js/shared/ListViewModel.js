/**
 * Created by natala on 13.12.14.
 */

define(['./CollectionViewModel'], function(CollectionViewModel) {
    var ListViewModel = function(config) {
        var self = CollectionViewModel(config);
        self.__base = _.clone(self);

        self.selected = ko.observable();

        self.parse = function() {
            self.__base.parse.apply(self, arguments);
            self.selectDefault();
        };

        self.selectDefault = function() {
            if (self.items().length > 0) {
                self.select(self.items()[0]);
            }

            self.each(function(item) {
                item.isSelected && item.isSelected.subscribe(self.select.bind(false, item));
            });
        };

        self.select = function(item, isSelected) {
            if (isSelected === false)
                return;

            if (self.selected() && self.selected().isSelected)
                self.selected().isSelected(false);

            self.selected(item);

            if (item && item.isSelected)
                item.isSelected(true);
        };

        return self;
    };

    CollectionViewModel.extendedWith(ListViewModel);

    return ListViewModel;
});