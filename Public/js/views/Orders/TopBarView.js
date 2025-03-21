define([
    'Underscore',
    'views/topBarViewBase',
    'text!templates/Orders/TopBarTemplate.html',
    'constants'
], function (_, BaseView, ContentTopBarTemplate, CONSTANTS) {
    'use strict';

    var TopBarView = BaseView.extend({
        el         : '#top-bar',
        contentType: CONSTANTS.ORDERS,
        template   : _.template(ContentTopBarTemplate)
    });

    return TopBarView;
});
