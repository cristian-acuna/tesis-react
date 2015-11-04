var Reflux = require('reflux');

var VinoActions = Reflux.createActions([
    'getVinos',
    'vinoElegido',
    'saveVino',
    'setBodegas',
    'setUvas',
    'setEdades',
    'setTipos',
    'saveBodega',
    'setWishlist'
]);

module.exports = VinoActions;