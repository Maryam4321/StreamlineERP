define([
    'Backbone'
], function (Backbone) {
    var Model = Backbone.Model.extend({
        idAttribute: '_id',

        urlRoot: function () {
            return '/warehouse/location';
        }
    });

    return Model;
});
