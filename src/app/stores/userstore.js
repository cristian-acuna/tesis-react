'use strict';

var Reflux = require('reflux');
var UserActions = require('../actions/useractions');

var UserStore = Reflux.createStore({
    listenables: [UserActions],
    userSession: {},
    init: function () {
        this.userSession = {};
    },

    onLoginUser: function (usuario) {
        this.userSession = usuario;
        this.trigger(this.getUserSession());
    },

    getUserSession: function () {
        return this.userSession;
    }
});

module.exports = UserStore;