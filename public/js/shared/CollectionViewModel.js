define(['./BaseViewModel'],
    function(BaseViewModel) {
        var CollectionViewModel = function (config) {
            var self = BaseViewModel(config);

            self.viewModel = config.viewModel;
            self.item = config.item;

            self.getItemConfig = function(rawItem, raw) {
                var itemConfig = _.clone(self.item);

                if (_.isFunction(self.item))
                    itemConfig = self.item(rawItem, raw, self);

                return _.extend({ api: self.api }, itemConfig);
            };

            self.items = ko.observableArray();

            self.parse = function(raw) {
                self.items([]);
                _.each(raw, function(rawItem) {
                    var config = self.getItemConfig(rawItem, raw);
                    config.api = config.api || self.api;
                    var instance = self.viewModel(config);
                    instance.parse(rawItem);
                    self.items.push(instance);
                });
            };

            self.fetch = function() {
                self.api.fetch().then(self.parse.bind(self));
            };

            self.save = function() {
                self.invoke("saveIfModified");
            };

            self.surrogateBind = function(func) {
                return function()
                    {
                        var surrogateConfig = {
                            viewModel: self.viewModel,
                            item: self.item,
                            population: func.bind(self, self.items()).apply(self, arguments)
                        };

                        return CollectionViewModel(surrogateConfig);
                    };
            };

            self.each = self.surrogateBind(_.each);
            self.where = self.surrogateBind(_.where);
            self.invoke = self.surrogateBind(_.invoke);

            self.itemDefaults = {};
            self.getItemDefaults = function() {
                return self.itemDefaults;
            };

            self.add = function() {
                var defaultData = self.getItemDefaults();
                var itemConfig = self.getItemConfig(defaultData, null) || {};

                var instance = self.viewModel(itemConfig);

                if (!instance)
                    return;

                instance.parse(defaultData);

                self.items.push(instance);
            };

            return self;
        };
        BaseViewModel.extendedWith(CollectionViewModel);

        return CollectionViewModel;
    });