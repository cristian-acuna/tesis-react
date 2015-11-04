'use strict';

var Reflux = require('reflux');
var VinoActions = require('../actions/vinoactions');

var VinoStore = Reflux.createStore({
    listenables: [VinoActions],
    bodegas: [],
    listaVinos: [],
    vinoElegido: {},
    wishlist: [],
    init: function () {
        this.bodegas = [];
        this.uvas = [];
        this.edades = [];
        this.tipos = [];
        this.listaVinos = [];
        this.vinoElegido = {};
        this.wishlist = [];
    },

    onGetVinos: function (vinos) {
        this.listaVinos = vinos;
        this.trigger(this.getListaVinos());
    },

    onVinoElegido: function (vino) {
        this.vinoElegido = vino;
        this.trigger(this.getVinoElegido());
    },

    onSetBodegas: function (bodegas) {
        this.bodegas = bodegas;
        this.trigger(this.getBodegas());
    },

    onSetUvas: function (uvas) {
        this.uvas = uvas;
        this.trigger(this.getUvas());
    },

    onSetTipos: function (tipos) {
        this.tipos = tipos;
        this.trigger(this.getTipos());
    },

    onSetEdades: function (edades) {
        this.edades = edades;
        this.trigger(this.getEdades());
    },

    onSetWishlist: function (wishlist) {
        this.wishlist = wishlist;
        this.trigger(this.getWishlist());
    },

    getListaVinos: function () {
        return this.listaVinos;
    },

    getVinoElegido: function () {
        return this.vinoElegido;
    },

    getBodegas: function () {
        return this.bodegas;
    },

    getUvas: function () {
        return this.uvas;
    },

    getEdades: function () {
        return this.edades;
    },

    getTipos: function () {
        return this.tipos;
    },

    getWishlist: function () {
        return this.wishlist;
    }
});

module.exports = VinoStore;