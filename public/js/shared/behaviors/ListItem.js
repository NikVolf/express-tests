/**
 * Created by natala on 14.12.14.
 */

define([], function() {

    return {
        init: function(viewModel) {
            viewModel.isSelected = ko.observable(false);
            viewModel.select = viewModel.isSelected.bind(undefined, true);
        }
    }

});