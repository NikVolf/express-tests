/**
 * Created by nikky on 12/5/14.
 */

var apiRoot = "/js/api";

require.config({
    paths: {
        "ko": "lib/knockout",
        "text": "lib/text",
        "api": apiRoot,
        "underscore": "lib/underscore"
    },

    shim : {
        underscore: {
            exports : "_"
        }
    }
});

define(["ko", "underscore", "utils/loading"], function(ko, loading) {

    window.ko = ko;

    var PageModel = function() {
        var self = {};

        self.componentName = ko.observable("loading");

        self.counter = 0;

        self.component = ko.observable();

        self.componentChanged = function(newPath) {
            self.componentName("loading");
            require([newPath], function(newModule) {
                self.pushComponent(newModule);
            });
        };

        self.pushComponent = function(component) {
            self.componentName(component.componentName);
        };

        self.component.subscribe(self.componentChanged);

        return self;
    };

    window.page = PageModel();

    ko.applyBindings(window.page, document.getElementById("page-root"));

    var hash = window.location.hash;
    var initialComponent = hash ? hash.substring(1, hash.length) : null;

    if (initialComponent)
        window.page.component(initialComponent);

    $(window).on("hashchange", function() {
        var hash = window.location.hash;
        var component = hash ? hash.substring(1, hash.length) : null;
        if (!component)
            return;

        window.page.component(component);
    });

});