import AppStore from '../stores/AppStore'

//import editionDate from '../data/editionDate'

//import chartData from '../data/chartData'

import settings from '../settings'

import $ from 'jquery'

const server = settings.server


export function getStore(callback) {

    AppStore.data.ediData = editionDate
    AppStore.data.chartData = chartData

    AppStore.emitChange()
}

export function changeTime(data) {

    AppStore.data.timeChoose = data

    AppStore.emitChange()
}

export function changeChartsPart(data) {
    let arr = AppStore.data.chartsData
    if( data == 666 ){
        if( arr.length == 0){
            arr.push('0')
        }else{
            let flag = arr[arr.length-1]
            flag++
            arr.push(flag)
        }
        AppStore.data.chartsData = arr
        AppStore.emitChange()
    }else{
        let index = 0
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == data){
                arr.pop()
            }
        }
        //arr.splice(index, 1);
        AppStore.emitChange()
    }
}






export function getSevenApiData(data) {

    const total = 5

    let count = 0;

    //const reqData = data

    function emit() {

        count++

        if(count == total) {

            AppStore.data.chart.ready = true;
            //在确定7个图表数据全都接收完毕之后emit
            console.log('emitchange!')
            AppStore.emitChange()
        }
    }

    //
    //
    const reqData = [
        {
            title: 'MauPerson',
            time: '',
            type: 1
        },
        {
            title: 'MauNumber',
            time: '',
            type: 4
        },
        {
            title: 'DauPerson',
            time: '',
            type: 2
        },
        {
            title: 'DauNumber',
            time: '',
            type: 3
        },
        {
            title: 'PernameVisit',
            time: ''
        },
        {
            title: 'PerVisitTime',
            time: ''
        },
        {
            title: 'Tenacity',
            time: '',
            type: 6
        }
    ]
    //
    //

    getMauPerson(reqData[0], (err) => {
        emit()

    })

    getMauNumber(reqData[1], (err) => {
        emit()

    })

    getDauPerson(reqData[2], (err) => {
        emit()

    })

    getDauNumber(reqData[3], (err) => {
        emit()

    })
    // getPernameVisit(reqData[4], (err) => {
    //     emit()
    //
    // })
    // getPerVisitTime(reqData[5], (err) => {
    //     emit()
    //
    // })
    getTenacity(reqData[6], (err) => {
        emit()

    })

}

export function getMauPerson(obj, cb) {

    $.post("http://log.edm.weibo.cn/api/getdata",
        {
            type: obj.type
        },
        function(data,status){
            let chartdata = data.data
            let user = chartdata.user //对象
            let vistor = chartdata.vistor
            let xAxisData = []
            let userdata = []
            let visitdata = []
            for(let i in user){
                xAxisData.push(i)
                userdata.push(user[i])
            }

            for(let i in vistor){
                //xAxisData.push(i)
                visitdata.push(vistor[i])
            }

            let alldata = []

            for (let i = 0; i < userdata.length; i++) {
                let val = Number( userdata[i] ) + Number( visitdata[i] )
                alldata.push(val)
            }

            //
            //计算tab上显示的百分比的值
            const leg = alldata.length
            if( leg > 1){
                let diff = alldata[1] -  alldata[0]
                if( diff < 0 ){
                    AppStore.data.tabsNum.mau[2] = 1 //表示有所下降
                }
                diff = Math.abs(diff)
                const rate = (( diff / alldata[0] )*100).toFixed(2)
                AppStore.data.tabsNum.mau[1] = rate
                AppStore.data.tabsNum.mau[0] = (alldata[1]/100000000).toFixed(2)
            }
            //
            //

            if ( alldata[0] > 100000 ){ //人数超过10万 单位换算成万
                //if ( alldata[0].length > 10 )
                if ( alldata[0] > 1000000000 ){
                    for( let i = 0; i < alldata.length; i++ ){
                        alldata[i] = parseInt(alldata[i] / 100000000)
                        userdata[i] = parseInt(userdata[i] / 100000000)
                        visitdata[i] = parseInt(visitdata[i] / 100000000)
                    }
                    (AppStore.data.showChart)[0].y = '亿人';
                }else{
                    for( let i = 0; i < alldata.length; i++ ){
                        alldata[i] = parseInt(alldata[i] / 10000)
                        userdata[i] = parseInt(userdata[i] / 10000)
                        visitdata[i] = parseInt(visitdata[i] / 10000)
                    }
                    (AppStore.data.showChart)[0].y = '万人';
                }
            }

            //xAxisData = xAxisData.reverse();
            //alldata = alldata.reverse();
            //userdata = userdata.reverse();
            //visitdata = visitdata.reverse();

            (AppStore.data.showChart)[0].xAxisData = xAxisData;
            (AppStore.data.showChart[0].data)[0].data = alldata;
            (AppStore.data.showChart[0].data)[1].data = userdata;
            (AppStore.data.showChart[0].data)[2].data = visitdata;

            cb(null)
        });

}

export function getMauNumber(obj, cb) {

    $.post("http://log.edm.weibo.cn/api/getdata",
        {
            type: 4
        },
        function(data,status) {
            let chartdata = data.data
            let xAxisData = []
            let alldata = []

            for (let i in chartdata) {
                xAxisData.push(i)
                alldata.push( chartdata[i].sessions)
            }

            if (alldata[0] > 100000) { //人数超过10万 单位换算成万
                if (alldata[0] > 1000000000) {
                    for (let i = 0; i < alldata.length; i++) {
                        alldata[i] = parseInt(alldata[i] / 100000000)
                    }
                    (AppStore.data.showChart)[1].y = '亿次';
                } else {
                    for (let i = 0; i < alldata.length; i++) {
                        alldata[i] = parseInt(alldata[i] / 10000)
                    }
                    (AppStore.data.showChart)[1].y = '万次';
                }
            }

            (AppStore.data.showChart)[1].xAxisData = xAxisData;
            (AppStore.data.showChart[1].data)[0].data = alldata;

            cb(null)
        });
}

export function getDauPerson(obj, cb) {

    $.post("http://log.edm.weibo.cn/api/getdata",
        {
            type: obj.type
        },
        function(data,status) {
            let chartdata = data.data
            let user = chartdata.user //对象
            let vistor = chartdata.vistor
            let xAxisData = []
            let userdata = []
            let visitdata = []
            for (let i in user) {
                xAxisData.push(i)
                userdata.push(user[i])
            }

            for (let i in vistor) {
                //xAxisData.push(i)
                visitdata.push(vistor[i])
            }

            let alldata = []

            for (let i = 0; i < userdata.length; i++) {
                let val = Number(userdata[i]) + Number(visitdata[i])
                alldata.push(val)
            }

            //
            //计算tab上显示的百分比的值
            const leg = alldata.length
            if( leg > 1){
                let diff = alldata[0] -  alldata[1]
                if( diff < 0 ){
                    AppStore.data.tabsNum.dau[2] = 1 //表示有所下降
                }
                diff = Math.abs(diff)
                const rate = (( diff / alldata[1] )*100).toFixed(2)
                AppStore.data.tabsNum.dau[1] = rate
                AppStore.data.tabsNum.dau[0] = (alldata[0]/10000000).toFixed(2)
            }
            //
            //

            if (alldata[0] > 100000) { //人数超过10万 单位换算成万
                //if ( alldata[0].length > 10 )
                if (alldata[0] > 1000000000) {
                    for (let i = 0; i < alldata.length; i++) {
                        alldata[i] = parseInt(alldata[i] / 100000000)
                        userdata[i] = parseInt(userdata[i] / 100000000)
                        visitdata[i] = parseInt(visitdata[i] / 100000000)
                    }
                    (AppStore.data.showChart)[2].y = '亿人';
                } else {
                    for (let i = 0; i < alldata.length; i++) {
                        alldata[i] = parseInt(alldata[i] / 10000)
                        userdata[i] = parseInt(userdata[i] / 10000)
                        visitdata[i] = parseInt(visitdata[i] / 10000)
                    }
                    (AppStore.data.showChart)[2].y = '万人';
                }
            }

            xAxisData = xAxisData.reverse();
            alldata = alldata.reverse();
            userdata = userdata.reverse();
            visitdata = visitdata.reverse();

            const averall = averCount(alldata,2);
            const averuser = averCount(userdata,2);
            const avervisitor = averCount(visitdata,2);

            (AppStore.data.showChart)[2].xAxisData = xAxisData;
            (AppStore.data.showChart[2].data)[0].data = alldata;
            (AppStore.data.showChart[2].data)[1].data = userdata;
            (AppStore.data.showChart[2].data)[2].data = visitdata;
            (AppStore.data.showChart[2].data)[3].data = averall;
            (AppStore.data.showChart[2].data)[4].data = averuser;
            (AppStore.data.showChart[2].data)[5].data = avervisitor;

            cb(null)
        });
}

export function getDauNumber(obj, cb) {

    $.post("http://log.edm.weibo.cn/api/getdata",  //此接口计算日访问总数，人均日访问次数，人均日访问时长，单次访问时长
        {
            type: 3
        },
        function(data,status) {
            let chartdata = data.data

            let session = chartdata.sessions //对象 访问次数
            let duration = chartdata.durations_total//对象
            let user = chartdata.user
            let visitor = chartdata.vistor

            let alldata = [] //访问次数
            let timedata = [] //访问时长
            let peopledata = [] //总人数
            let perdata = [] //人均日访问次数
            let pertimedata = []//人均日访问时长

            let xAxisData = [] //横轴的日期部分数据
            for (let i in session) {
                if( (session[i] == 0)||(duration[i] == 0)||(user[i] == 0) ){
                    // 对可能出现的零值进行的处理
                    //console.log(visitor[i])
                }else{
                    xAxisData.push(i)
                    alldata.push(session[i])
                    timedata.push(duration[i])
                    peopledata.push( parseInt(user[i]) + parseInt(visitor[i]) )
                }
            }

            for (let i = 0; i < peopledata.length; i++) { //人均日访问时长
                pertimedata[i] = ( timedata[i]/peopledata[i]/60 ).toFixed(2)
            }

            for (let i = 0; i < timedata.length; i++) { //单次访问平均时长
                timedata[i] = ( timedata[i]/alldata[i]/60 ).toFixed(2)
            }

            for (let i = 0; i < peopledata.length; i++) { //人均日访问次数
                perdata[i] = ( alldata[i]/peopledata[i] ).toFixed(2)
            }

            //
            //计算tab上显示的百分比的值
            const leg = pertimedata.length
            if( leg > 1){
                let diff = pertimedata[0] -  pertimedata[1]
                if( diff < 0 ){
                    AppStore.data.tabsNum.duration[2] = 1 //表示有所下降
                }
                diff = Math.abs(diff)
                const rate = (( diff / pertimedata[1] )*100).toFixed(2)
                AppStore.data.tabsNum.duration[1] = rate
                AppStore.data.tabsNum.duration[0] = pertimedata[0]
            }
            //
            //


            if (alldata[0] > 100000) { //人数超过10万 单位换算成万
                if (alldata[0] > 1000000000) {
                    for (let i = 0; i < alldata.length; i++) {
                        alldata[i] = (alldata[i] / 100000000).toFixed(2)
                    }
                    (AppStore.data.showChart)[3].y = '亿次';
                } else {
                    for (let i = 0; i < alldata.length; i++) {
                        alldata[i] = (alldata[i] / 10000).toFixed(2)
                    }
                    (AppStore.data.showChart)[3].y = '万次';
                }
            }

            for (let i = 0; i < alldata.length; i++) {
                let n = parseFloat(alldata[i]) //把返回的数据的字符串转成浮点数
                alldata[i] = n
                let m = parseFloat(timedata[i])
                timedata[i] = m
                let j = parseFloat(perdata[i])
                perdata[i] = j
                let k = parseFloat(pertimedata[i])
                pertimedata[i] = k
            }

            xAxisData = xAxisData.reverse();
            alldata = alldata.reverse();
            timedata = timedata.reverse();
            perdata = perdata.reverse();
            pertimedata = pertimedata.reverse();

            const averall = averCount(alldata,3);
            const avertime = averCount(timedata,3);
            const averper = averCount(perdata,3);
            const averpertime = averCount(pertimedata,3);


            //日访问总数
            (AppStore.data.showChart)[3].xAxisData = xAxisData;
            (AppStore.data.showChart[3].data)[0].data = alldata;
            (AppStore.data.showChart[3].data)[1].data = averall;
            //单次访问平均时长
            (AppStore.data.showChart)[7].xAxisData = xAxisData;
            (AppStore.data.showChart[7].data)[0].data = timedata;
            (AppStore.data.showChart[7].data)[1].data = avertime;
            //人均日访问次数
            (AppStore.data.showChart)[4].xAxisData = xAxisData;
            (AppStore.data.showChart[4].data)[0].data = perdata;
            (AppStore.data.showChart[4].data)[1].data = averper;
            //人均日访问时长
            (AppStore.data.showChart)[5].xAxisData = xAxisData;
            (AppStore.data.showChart[5].data)[0].data = pertimedata;
            (AppStore.data.showChart[5].data)[1].data = averpertime;

            cb(null)
        });
}

export function getPernameVisit(obj, cb) {

}

export function getPerVisitTime(obj, cb) {

}

export function getTenacity(obj, cb) {

    $.post("http://log.edm.weibo.cn/api/getdata",
        {
            type: 6,
            time: '2016-09-12'
        },
        function(data,status) {
            let chartdata = data.data
            let mau = chartdata.mau //对象
            let dau = chartdata.dau

            let xAxisData = []
            let tendata = []
            let maudata = []

            for (let i in dau) {
                xAxisData.push(i)
                tendata.push( dau[i] )
                let k = i.substring(0,6)
                for( k in mau ){
                    maudata.push( mau[k] )
                }
            }

            for (let i = 0; i < tendata.length; i++) {
                let n = parseFloat(tendata[i]) //把返回的数据的字符串转成浮点数
                tendata[i] = n
                let m = parseFloat(maudata[i]) //把返回的数据的字符串转成浮点数
                maudata[i] = m

                tendata[i] = ( tendata[i]/maudata[i] ).toFixed(3)

                let g = parseFloat(tendata[i]) //把返回的数据的字符串转成浮点数
                tendata[i] = g
            }

            const averall = averCount(tendata,1);

            (AppStore.data.showChart)[6].xAxisData = xAxisData;
            (AppStore.data.showChart[6].data)[0].data = tendata;
            (AppStore.data.showChart[6].data)[1].data = averall;

            cb(null)
        });

}

export function averCount(arr,num){
    let averarr = []
    let aver = 0
    for (let i = 0; i < arr.length; i++) {
        let total = 0
        for (let key = 0; key <= i; key++) {
            total = total + arr[key]
        }
        aver = total / (i+1)
        if( num > 2){
            aver = aver.toFixed(2)
        }else{
            if( num == 1 ){
                aver = aver.toFixed(3)
            }else{
                aver = parseInt(aver)
            }
        }
        averarr.push(aver)
        // if ( i < flag ){ //对于前12个数据由于前面的数据不到12个所以是计算之前所有数的平均数
        //     let total = 0
        //     for (let key = 0; key <= i; key++) {
        //         total = total + arr[key]
        //     }
        //     aver = total / (i+1)
        //     aver = aver.toFixed(1)
        //     averarr.push(aver)
        // }else{
        //     let total = 0
        //     for ( let key = i-flag; key < i; key++) {
        //         total = total + arr[key]
        //     }
        //     aver = total / flag
        //     aver = aver.toFixed(1)
        //     averarr.push(aver)
        // }
    }
    return averarr
}
