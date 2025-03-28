define([
    'Backbone',
    'Underscore',
    'jQuery',
    'text!templates/settingsOverview/settingsEmployee/languages/ListTemplate.html',
    'views/settingsOverview/settingsEmployee/languages/EditView',
    'views/settingsOverview/settingsEmployee/languages/CreateView',
    'helpers/ga',
    'constants/googleAnalytics'
], function (Backbone, _, $, LanguagesListTemplate, EditView, CreateView, ga, GA) {
    'use strict';

    var ContentView = Backbone.View.extend({
        template: _.template(LanguagesListTemplate),
        el      : '#languageTab',

        initialize: function (options) {
            this.collection = options.collection;

            this.collection.bind('add change', this.render, this);

            this.render();
        },

        events: {
            'click .goToEdit'         : 'goToEditDialog',
            'click .goToRemove'       : 'deleteItem',
            'click #top-bar-createBtn': 'createLanguage',
            'click .toggleList'       : 'toggleList'
        },

        deleteItem: function (e) {
            var self = this;
            var tr = $(e.target).closest('tr');
            var id = tr.data('id');
            var model = this.collection.get(id);
            var answer = confirm('Really DELETE item ?!');

            e.preventDefault();
            ga && ga.event({
                eventCategory: GA.EVENT_CATEGORIES.USER_ACTION,
                eventLabel   : GA.EVENT_LABEL.DELETE_LANGUAGES
            });

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

            ga && ga.event({
                eventCategory: GA.EVENT_CATEGORIES.USER_ACTION,
                eventLabel   : GA.EVENT_LABEL.EDIT_LANGUAGES
            });
            if (model) {
                return new EditView({
                    model     : model,
                    collection: this.collection
                });
            }
        },

        createLanguage: function (e) {
            e.preventDefault();
            ga && ga.event({
                eventCategory: GA.EVENT_CATEGORIES.USER_ACTION,
                eventLabel   : GA.EVENT_LABEL.CREATE_LANGUAGES
            });

            return new CreateView({collection: this.collection});
        },

        render: function () {
            this.$el.html(this.template({collection: this.collection.toJSON()}));
        }

    });

    return ContentView;
});
