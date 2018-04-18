/**
 * Created by Administrator on 2017/3/7.
 */
var AppDispatcher = require('../dispatcher/AppDispatcherttt');

var ButtonActions = {
    addNewItem: function (text) {
        AppDispatcher.dispatch({
            actionType: 'ADD_NEW_ITEM',
            text: text
        });
    },
};


module.exports = ButtonActions;