﻿define([
    'Backbone',
    'Underscore',
    'text!templates/Applications/list/ListTemplate.html'
], function (Backbone, _, ApplicationsListTemplate) {
    'use strict';
    var ApplicationsListItemView = Backbone.View.extend({
        el: '#listTable',

        initialize: function (options) {
            this.collection = options.collection;
            //this.startNumber = (parseInt(this.collection.currentPage, 10) - 1) * this.collection.pageSize; // Counting the start index of list items
        },

        render: function () {
            this.$el.append(_.template(ApplicationsListTemplate, {
                applicationsCollection: this.collection.toJSON(),
                //startNumber           : this.startNumber
            }));
        }
    });
    return ApplicationsListItemView;
});
