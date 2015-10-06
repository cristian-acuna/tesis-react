var Reflux = require('reflux');

var UserActions = Reflux.createActions([
    'loginUser',
    'logoutUser'
]);

module.exports = UserActions;