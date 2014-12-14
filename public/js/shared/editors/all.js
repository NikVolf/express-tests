/**
 * Created by natala on 14.12.14.
 */

define(['text!./templates/text.html'], function(textTemplate) {

    var TextEditor = function(params) {
        var self = {};

        self.value = params;

        self.changed = ko.observable(false);

        self.isEdited = ko.observable(false);

        return self;
    };

    ko.components.register("text-editor", {
        viewModel: TextEditor,
        template: textTemplate
    });

    return {
        Text: TextEditor
    };

});