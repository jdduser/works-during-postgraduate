/**
 * Created by Administrator on 2017/3/7.
 */
var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();
var ListStore = require('../stores/ListStorettt');

AppDispatcher.register(function (action) {
    switch(action.actionType) {
        case 'ADD_NEW_ITEM':
            ListStore.addNewItemHandler(action.text);
            ListStore.emitChange();
            break;
        case 'get':
            ListStore.getAll();
            break;
        default:

        // no op
    }
})

module.exports = AppDispatcher;