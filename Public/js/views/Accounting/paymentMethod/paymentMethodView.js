define([
    'Backbone',
    'Underscore',
    'jQuery',
    'text!templates/Accounting/PaymentMethodList.html',
    'views/Accounting/paymentMethod/paymentMethodEdit',
    'views/Accounting/paymentMethod/paymentMethodCreate'
], function (Backbone, _, $, PaymentMethodList, RditView, CreateView) {
    'use strict';

    var ContentView = Backbone.View.extend({
        template  : _.template(PaymentMethodList),
        el        : '#paymentmethods-holder',
        initialize: function (options) {
            this.startTime = options.startTime;
            this.collection = options.collection;
            this.render();
        },

        events: {
            'click .goToEdit'         : 'goToEditDialog',
            'click .goToRemove'       : 'deleteItem',
            'click #top-bar-createBtn': 'createPaymentMethod',
            'click .toggleList'       : 'toggleList'
        },

        deleteItem: function (e) {
            var self = this;
            var $tr = $(e.target).closest('tr');
            var id = $tr.attr('data-id');
            var model = this.collection.get(id);
            var answer = confirm('Really DELETE items ?!');

            e.preventDefault();

            if (answer === true && model) {

                model.destroy({
                    success: function (model) {
                        self.$el.find('tr[data-id="' + model.id + '"]').remove();
                    },

                    error: function (model, err) {
                        if (err.status === 403) {
                            App.render({
                                type   : 'error',
                                message: 'You do not have permission to perform this action'
                            });
                        }
                    }
                });
            }
        },

        toggleList: function (e) {
            e.preventDefault();
            this.$el.find('.forToggle').toggle();
        },

        goToEditDialog: function (e) {
            var tr = $(e.target).closest('tr');
            var id = tr.attr('data-id');
            var model = this.collection.get(id);

            e.preventDefault();

            if (model) {
                return new RditView({model: model});
            }
        },

        createPaymentMethod: function (e) {
            e.preventDefault();

            return new CreateView({collection: this.collection});
        },

        render: function () {
            this.$el.html(this.template({collection: this.collection.toJSON()}));
        }

    });
    return ContentView;
});
