/**
 * Created by sunqi on 16/5/8.
 */
import { Dispatcher } from 'flux'

import { getStore } from '../actions/actions'

const AppDispatcher = new Dispatcher()

AppDispatcher.register(function(payload) {
    let action = payload.action
    switch(action) {

        /*
         * 全局操作
         * */
        //
        case 'GET_APP_STORE':
             getStore()
             break

    }
    return true
})

export default AppDispatcher