'use strict';

var Reflux = require('reflux');
var VinoActions = require('../actions/vinoactions');

var VinoStore = Reflux.createStore({
    listenables: [VinoActions],
    bodegas: [],
    listaVinos: [],
    vinoElegido: {},
    init: function () {
        this.bodegas = [];
        this.listaVinos = [];
        this.vinoElegido = {};
    },

    onGetVinos: function (vinos) {
        this.listaVinos = vinos;
        this.trigger(this.getListaVinos());
    },

    onVinoElegido: function (vino) {
        this.vinoElegido = vino;
        this.trigger(this.getVinoElegido());
    },

    onGetBodegas: function (bodegas) {
        this.bodegas = bodegas;
        this.trigger(this.getBodegas());
    },

    getListaVinos: function () {
        return this.listaVinos;
    },

    getVinoElegido: function () {
        return this.vinoElegido;
    },

    getBodegas: function () {
        return this.bodegas;
    }
});

module.exports = VinoStore;