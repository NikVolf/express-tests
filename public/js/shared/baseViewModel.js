/**
 * Created by natala on 12.12.14.
 */

define([], function() {

    var BaseViewModel = function(config) {
        var self = {};

        self.diagnostic = window.diagnostic || (window.diagnostic = ko.observable(false));

        _.extend(self, _.pick(config, "api", "template", "fields", "data"));

        if (!self.fields && self.data)
            self.fields = _.map(self.data, function(value, key) { return key; });

        self.isViewModel = true;

        self.observables = [];

        self.getFieldValue = function(key) {
            var result = {
                defined: false,
                value: null
            };

            var keyValue = self[key];

            if (!keyValue)
                return result;

            if (keyValue.isViewModel)
            {
                result.defined = true;
                result.value = keyValue.toJSON();
                return result;
            }

            if (_.isFunction(keyValue)) {
                result.defined = true;
                result.value = keyValue();
                return result;
            }

            return result;
        };

        self.parse = function(raw) {
            _.each(self.fields, self.parseField.bind(self, raw));

            self.id = ko.observable(raw.id);

            self.modified([])
            ;
            self.isNew(!self.id());
            self.id.subscribe(function(newValue) {
                 self.isNew(!!!newValue);
            });
        };

        self.modified = ko.observableArray([]);

        self.isModified = ko.pureComputed(function() {
            return self.modified().length > 0;
        });

        self.propertyCreated = function(key, property) {
            if (property.isViewModel) {
                property.isModified.subscribe(function(newValue) {
                    if (newValue)
                        self.modified.unshift(key);
                    else self.modified.remove(key);
                });

                return;
            }

            self.original = self.original || {};
            self.original[key] = property();

            property.subscribe(function(newValue) {
                self.modified.remove(key);
                var originalValue = self.original[key];
                if (originalValue == newValue)
                    return;

                self.modified.unshift(key);
            });
        };

        self.parseField = function(raw, field) {
            var rawKey = field;
            var rawValue;
            if (_.isObject(field))
                rawKey = field.key;
            if (_.isFunction(field))
                rawValue = field(raw, self);

            rawValue = rawValue || raw[rawKey];

            var property;

            if (field.type == "viewModel")
            {
                var viewModel = field.viewModelClass();
                viewModel.parse(rawValue);
                property = viewModel;
            }
            else property = ko.observable(rawValue);

            var instanceKey = field.instanceKey || rawKey;

            if (!self[instanceKey]) {
                self[instanceKey] = property;
                self.propertyCreated(instanceKey, property);
            }

            self[instanceKey] = property;

            self.observables.push(instanceKey);
        };

        self.isNew = ko.observable(true);

        self.isEdited = ko.observable(false);

        self.edit = function() {
            self.isEdited(true);
        };

        self.save = function() {
            var deferred = $.Deferred();
            self.api.save(self.toJSON()).then(function(serverState) {
                if (serverState)
                    self.parse(serverState);

                deferred.resolve();
            });
            return deferred.promise();
        };

        self.saveIfModified = function() {
            self.isModified() && self.save();
        };

        self.toJSON = function() {
            var result = {};
            _.each(self.observables, function(observable) {
                var fieldValue = self[observable];
                if (fieldValue.toJSON)
                    fieldValue = fieldValue.toJSON();
                else _.isFunction(fieldValue)
                    fieldValue = fieldValue();

                result[observable] = fieldValue;
            });

            if (!self.isNew())
                result.id = self.id();

            return result;
        };

        return self;
    };


    BaseViewModel.extendedWith = function(componentClass) {

        _.extend(componentClass, _.pick(BaseViewModel, "extendedWith"));

        if (!componentClass.componentName)
            return;

        var componentFactory = function (params) {
            if (params && params.value && params.value.isViewModel) {
                return params.value;

            }
            var instance = componentClass({ data: params && params.value });

            if (params && params.value)
                instance.parse(params.value);

            instance.entry && instance.entry();

            return instance;
        };


        ko.components.register(
            componentClass.componentName,
            {
                template: componentClass.template,
                viewModel: componentFactory
            });

    };

    return BaseViewModel;

});