var Reflux = require('reflux');

var VinoActions = Reflux.createActions([
    'getVinos',
    'vinoElegido',
    'saveVino',
    'getBodegas',
    'saveBodega'
]);

module.exports = VinoActions;