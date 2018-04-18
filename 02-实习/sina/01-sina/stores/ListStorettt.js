/**
 * Created by Administrator on 2017/3/7.
 */
import $ from 'jquery'
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var ListStore = assign({}, EventEmitter.prototype, {
    items: [
        {
            NO:'01',
            name:'小明',
            sex:'女'

        },
        {
            NO:'01',
            name:'小明',
            sex:'女'
        },
    ],
    getAll: function () {
        //return this.items;
        $.get("http://localhost:5000/getAll",
            function(data,status){
                console.log(data)
                ListStore.items=JSON.parse(data)
                ListStore.emitChange();
            });

    },

    addNewItemHandler: function (text) {
        this.items.push(text);
    },

    emitChange: function () {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});
module.exports = ListStore;


