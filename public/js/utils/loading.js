/**
 * Created by nikky on 12/6/14.
 */

define(["ko"], function(ko) {
    var Loading = {
        componentName: "loading",
        template: "<div>Loading <span data-bind='text: dots' /></div>",
        viewModel: function() {
            var self = {};

            self.dots = ko.observable("...");

            self.someTimePassed = function() {
                self.dots(self.dots() + ".");
                setTimeout(self.someTimePassed, 1000);
            };

            setTimeout(self.someTimePassed, 1000);

            return self;
        }
    };

    ko.components.register("loading", {
        viewModel: Loading.viewModel,
        template: Loading.template
    });

    return Loading;


});