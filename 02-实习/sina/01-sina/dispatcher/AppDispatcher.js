/**
 * Created by sunqi on 16/5/8.
 */
import { Dispatcher } from 'flux'

import { getStore , changeTime , changeChartsPart , getSevenApiData } from '../actions/actions'

import { changeSingle , changePort , getChart,getVersion } from '../actions/dataActions'

const AppDispatcher = new Dispatcher()

AppDispatcher.register(function(payload) {


    let action = payload.action
    switch(action) {

        // /*
        // * 全局操作
        // * */
        //
        case 'GET_APP_STORE':
             getStore()
             break

        case 'CHANGE_TIMECHOOSE':
            changeTime(payload.data)
            break

        case 'CHANGE_TIMESIZE':
            changeTimeSize(payload.data)
            break

        case 'CHANGE_CHARTSPART':
            changeChartsPart(payload.data)
            break

        case 'GET_CHARTSDATA':
            getSevenApiData(payload.data)
            break


        //  test3 的所有全局操作
        case 'CHANGE_SINGLE':
            changeSingle(payload.data)
            break


        case 'CHANGE_PORT':
            console.log('dispatch changing port')
            changePort(payload.data)
            break

        case 'GET_CHART':
            console.log('dispatch get_chart')
            getChart(payload.data)
            break

        case 'GET_VERSION':
            console.log('dispatch GET_VERSION')
            getVersion()
            break





    }
    return true
})

export default AppDispatcher