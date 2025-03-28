﻿define([
    'Backbone',
    'Underscore',
    'text!templates/Products/list/ListTemplate.html'
], function (Backbone, _, ProductListTemplate) {
    var ProductListItemView = Backbone.View.extend({
        el: '#listTable',

        initialize: function (options) {
            this.collection = options.collection;
            this.startNumber = (parseInt(this.collection.currentPage, 10) - 1) * this.collection.pageSize;// Counting the start index of list items
        },

        render: function () {
            this.$el.append(_.template(ProductListTemplate, {
                productCollection: this.collection.toJSON(),
                startNumber      : this.startNumber
            }));
        }
    });

    return ProductListItemView;
});
