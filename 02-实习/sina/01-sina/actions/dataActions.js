/**
 * Created by ccy on 2017/3/2.
 */
import AppStore from '../stores/AppStore'

import settings from '../settings'

import $ from 'jquery'

const server = settings.server


export function changeSingle(data) {
    if( data  > 4 ){
        AppStore.data.timechoose2 = data
    }else{
        AppStore.data.timechoose1 = data
    }
    AppStore.emitChange()
}

//修改要提交给接口的数据
export function changePort(data) {
    if( data.num == 1 ){ //业务名
        AppStore.data.PortData.business_name = data.value
    }else{
        if( data.num == 2){ //平台
            AppStore.data.PortData.platform = data.value
        }else{
            if( data.num == 3 ){ //版本
                AppStore.data.PortData.edition = data.value
            }else{
                if( data.num == 4 ){ //时间 需要对时间的格式进行处理
                    let time = data.value
                    time = time.substring(0,4) + time.substring(5,7) + time.substring(8,15) + time.substring(16,18) + time.substring(19,21);
                    AppStore.data.PortData.time = time
                }else{ //颗粒度
                    AppStore.data.PortData.granularity = data.value
                }
            }
        }
    }
    AppStore.emitChange("changeport")
}

export function getChart(data) {

    //请求数据并且将数据处理之后保存至本地
    console.log('action 往后台传的参数');
    console.log(data);
    //$.post("/php/start.php?api=PerformGscale.getdata",data,
    $.post("http://test.sla.weibo.cn/php/start.php?api=PerformGscale.getdata",data,
        function(data,status){


            console.log(' action 从后台请求到的数据');
            console.log(data.data);
            const tableData = data.data.table //折叠面板中的数据
            const sortData = data.data.sort //下方第一个图表top10的数据
            const timeData = data.data.time //下方第二个图表时间的数据


            let alltype = []



            //折叠部分成功率的处理过程
            if( tableData ){
                let tableOriginal=[];
                if(tableData.original){
                    tableOriginal=tableData.original
                }else if(tableData.Original){
                    tableOriginal=tableData.Original
                }
                //先获得所有数据的时间，即横轴数据，根据成功率的数据来保存
                let xAxisData = []
                if(tableOriginal.length!=0){   //如果里面有数据
                    for( let i in tableOriginal.success_rate ){
                        if(typeof(tableOriginal.success_rate[i])=='number'){
                            xAxisData.push(i)
                        }
                    }

                    if(xAxisData.length==0) {
                        for (let k in tableData) {
                            for (let l in tableData[k].success_rate) {

                                if (typeof(tableData[k].success_rate[l]) == 'number') {

                                    xAxisData.push(l)
                                }
                            }
                        }
                    }

                }else{
                    AppStore.data.testTableData1.Original.PV = ''
                    AppStore.data.testTableData1.Original.UV =''
                    AppStore.data.testTableData1.Original.Success = ''
                   //console.log(tableData)
                    //处理没有original的数据
                    for( let k in tableData ){
                        for( let l in tableData[k].success_rate ){

                            if( typeof (tableData[k].success_rate[l])=='number'){

                                xAxisData.push(l)
                            }
                        }
                    }

                }

                let type = [] //把所有参与比较的对象统计保存 eg：variation1，variation2，variation3
                let data = []   //echart外部的那个data
                let variationData = [] //表格中变量
                let canzhao=[]
                let ttype=[]
                let t='';
                let mint=100;
                for( let k in tableData ){

                    if(k=='Original'||k=='original'){
                        ttype.push('Original')
                        t='Original'
                    }  else{
                        ttype.push(k)
                        t=k
                    }
                    
                    type.push(k)

                    let item = {  //创建echarts需要的数据格式
                        type: 'line',
                        name: t,
                        data: []
                    }
                    const successdata = tableData[k].success_rate

                    for( let g in successdata){  //把成功率的值依次保存

                            if(xAxisData.indexOf(g)!=-1){
                                (item.data).push(successdata[g])
                                if(successdata[g]< mint&&typeof (successdata[g])=='number'){
                                    mint=successdata[g]
                                }
                            }


                    }

                    data.push(item)

                    //下面处理表格的值

                    if( k == 'original'||k == 'Original'){
                        AppStore.data.testTableData1.Original.PV = tableOriginal.PV_total
                        AppStore.data.testTableData1.Original.UV = tableOriginal.UV_total
                        AppStore.data.testTableData1.Original.Success = tableOriginal.success_aver
                    }else{
                        let tabitem = {
                            name: k,
                            PV: tableData[k].PV_total,
                            UV: tableData[k].UV_total,
                            Success: tableData[k].success_aver
                        }
                         variationData.push(tabitem)
                    }
                }
                AppStore.data.testChartData[0].xAxisData = xAxisData
                AppStore.data.testChartData[0].max=100
                AppStore.data.testChartData[0].min=mint==0?0:Math.floor(mint-Math.ceil((100-mint)/5))

                AppStore.data.testChartData[0].data = data
                AppStore.data.testTableData1.variation=variationData

                //由于对比项目都相同所以在这里把所有图表的type都修改了
                AppStore.data.testChartData[0].type = ttype
                AppStore.data.testChartData[1].type = ttype
                AppStore.data.testChartData[2].type = ttype
                AppStore.data.testChartData[3].type = ttype
                AppStore.data.testChartData[4].type = ttype
                AppStore.data.testChartData[5].type = ttype
                AppStore.data.testChartData[6].type = ttype

                alltype = type
            }


            //折叠部分平均时间的处理过程
            if( tableData ){
                let tableOriginal=[];
                if(tableData.original){
                    tableOriginal=tableData.original
                }else if(tableData.Original){
                    tableOriginal=tableData.Original
                }
                let xAxisData = []
                if(tableOriginal.length!=0) {
                    for (let i in tableOriginal.aver_time) {  //横轴数据
                        if(typeof(tableOriginal.aver_time[i])=='number') {
                            xAxisData.push(i)
                        }
                    }
                    console.log(xAxisData.length)
                    if(xAxisData.length==0){   //处理有original但是没有数据的情况
                        for( let k in tableData ){
                            for( let l in tableData[k].aver_time ){

                                if(typeof(tableData[k].aver_time[l])=='number'){

                                    xAxisData.push(l)
                                }
                            }
                        }
                    }
                }else{
                    AppStore.data.testTableData2.Original.平均耗时 = ''
                    AppStore.data.testTableData2.Original.网络耗时 = ''
                    AppStore.data.testTableData2.Original.本地耗时 = ''
                    for( let k in tableData ){
                        for( let l in tableData[k].aver_time ){

                            if(typeof(tableData[k].aver_time[l])=='number'){

                                xAxisData.push(l)
                            }
                        }
                    }
                }
                let averdata = []
                let variationData = []

                let t=''
                let max=0
                let min=100



                for( let k in tableData ){
                    if(k=='original'){
                        t='Original'
                    } else{
                            t=k
                    }
                    let item = {  //创建echarts需要的数据格式
                        type: 'line',
                        name: t,
                        data: []
                    }
                    const avertime = tableData[k].aver_time
                    for( let g in avertime){  //把original中的成功率的值依次保存
                        if(xAxisData.indexOf(g)!=-1){
                            (item.data).push(avertime[g])

                            if(parseFloat(avertime[g])>parseFloat(max) && typeof (avertime[g])=='number'){
                                max=avertime[g]
                            }
                            if(avertime[g]<min && typeof (avertime[g])=='number'){
                                min=avertime[g]
                            }
                        }
                    }
                    averdata.push(item)

                    //下面处理表格的值

                    if( k == 'original'|| k == 'Original'){
                        AppStore.data.testTableData2.Original.平均耗时 = tableOriginal.aver_average
                        AppStore.data.testTableData2.Original.网络耗时 = tableOriginal.net_average
                        AppStore.data.testTableData2.Original.本地耗时 = tableOriginal.local_average
                    }else{
                         let tabitem = {
                             name: k,
                             aver: tableData[k].aver_average,
                             local: tableData[k].local_average,
                             net: tableData[k].net_average
                         }
                         variationData.push(tabitem)
                    }
                }


                AppStore.data.testChartData[1].xAxisData = xAxisData
                AppStore.data.testChartData[1].data = averdata
                AppStore.data.testChartData[1].min = 0
                AppStore.data.testChartData[1].max = Math.ceil(max)
                AppStore.data.testTableData2.variation = variationData



                //折叠本地平均时间的处理过程
                let localdata = []
                //let variationData = []
                let t1=''
                let max1=0
                let min1=100

                for( let m in tableData ){
                    if(m=='original'){
                        t1='Original'
                    }     else{
                        t1=m
                    }
                    let item = {  //创建echarts需要的数据格式
                        type: 'line',
                        name: t1,
                        data: []
                    }
                    const localtime = tableData[m].local_time
                    for( let g in localtime){  //把original中的成功率的值依次保存
                        if(xAxisData.indexOf(g)!=-1){
                            (item.data).push(localtime[g])
                            if(parseFloat(localtime[g])>parseFloat(max1) && localtime[g]!=''){
                                max1=localtime[g]
                            }
                            if(localtime[g]<min1 && localtime[g]!=''){
                                min1=localtime[g]
                            }
                        }
                    }
                    localdata.push(item)
                }

                AppStore.data.testChartData[2].xAxisData = xAxisData
                AppStore.data.testChartData[2].data = localdata
                AppStore.data.testChartData[2].min = 0
                AppStore.data.testChartData[2].max = Math.ceil(max1)


                //折叠网络平均时间的处理过程
                let netdata = []
                //let variationData = []
                let max2=0
                let min2=100


                for( let n in tableData ){
                    if(n=='original'){
                        t1='Original'
                    } else{
                        t1=n
                    }
                    let item = {  //创建echarts需要的数据格式
                        type: 'line',
                        name: t1,
                        data: []
                    }
                    const nettime = tableData[n].network_time
                    for( let g in nettime){  //把original中的成功率的值依次保存
                        if(xAxisData.indexOf(g)!=-1){
                         (item.data).push(nettime[g])
                            if(parseFloat(nettime[g])>parseFloat(max2) && nettime[g]!=''){
                                max2=nettime[g]
                            }
                            if(nettime[g]<min2 && nettime[g]!=''){
                                min2=nettime[g]
                            }
                        }
                    }
                    netdata.push(item)
                }

                AppStore.data.testChartData[3].xAxisData = xAxisData
                AppStore.data.testChartData[3].data = netdata
                AppStore.data.testChartData[3].min = 0
                AppStore.data.testChartData[3].max = Math.ceil(max2)
            }


            //下方第一个图表的数据处理过程
            if( sortData ){
                let chartyAxisData = [] //图表的y轴部分
                let chartData = [] //图表的data部分
                let nn=''

                for( let len = 0 ; len < alltype.length ; len++){
                    if(alltype[len]=='original'){
                        nn='Original'
                    }else{
                        nn=alltype[len]
                    }
                    let item = {
                        type:'bar',
                        name: nn,
                        data:[],
                        barWidth: 5
                    }
                    chartData.push(item)
                }
                let errorcodesum=[]
                let typesALl=[]
                //----------------------------------------------------排序处理---------------------------------
                //计算每个参照组的数量和
                for( let len = 0 ; len < alltype.length ; len++){
                    //console.log(alltype[len])
                    let sum=0;
                    for( let i in sortData ){

                        if( (sortData[i])[alltype[len]] ){
                            sum=sum+parseInt((sortData[i])[alltype[len]])
                            typesALl[alltype[len]]=sum

                        }
                    }
                }

                //记录每个错误码字段的百分比的和
                for( let i in sortData ){
                    let sum=0;
                    for( let len = 0 ; len < alltype.length ; len++){
                        if((sortData[i])[alltype[len]] ){
                            if(typesALl[alltype[len]]){
                                sum=sum+(((sortData[i])[alltype[len]])/typesALl[alltype[len]]) *100
                            }
                        }
                    }
                    errorcodesum.push(sum)
                }

                //排序
                let sortError=errorcodesum.sort(function(a,b){return b-a});
                let length=sortError.length;
                //处理显示前几名
                if(alltype.length>6 && sortError.length>4){
                    length=4
                }else if(alltype.length>3 && sortError.length>6){
                    length=6
                }

                for(let j=0;j<length;j++){

                    for( let i in sortData ){
                        let sum=0;
                        for( let len = 0 ; len < alltype.length ; len++){
                            if( (sortData[i])[alltype[len]] ){
                                sum=sum+(((sortData[i])[alltype[len]])/typesALl[alltype[len]]) *100
                            }
                        }
                        if(sum==sortError[j] && chartyAxisData.indexOf(i)==-1){
                            chartyAxisData.push(i)
                            //console.log(i+":"+sum)
                        }
                    }

                }
                console.log(chartyAxisData)

                for( let i in chartyAxisData ){  //所有错误码字段
                    for( let len = 0 ; len < alltype.length ; len++){
                        if( (sortData[chartyAxisData[i]])[alltype[len]] ){
                            let num = (sortData[chartyAxisData[i]])[alltype[len]]
                            num = parseInt(num)
                            chartData[len].data.push(num)
                        }else{
                            chartData[len].data.push(0)
                        }
                    }
                }

                //把数据倒序换算百分比
                for( let len = 0 ; len < chartData.length ; len++) {
                    chartData[len].data.reverse()
                    let total = 0
                    for( let flag = 0 ; flag < chartData[len].data.length ; flag++) {
                        total = total + (chartData[len].data)[flag]
                    }
                    for( let flag = 0 ; flag < chartData[len].data.length ; flag++) {
                        (chartData[len].data)[flag] = ( ( (chartData[len].data)[flag] / total )*100 ).toFixed(2)
                    }
                }



                AppStore.data.testChartData[4].yAxisData = chartyAxisData.reverse()
                AppStore.data.testChartData[4].data = chartData
            }


            //下方第二个图表的数据处理过程
            //本地
            if( timeData ){
                //不需要修改y轴的内容，只需要将数据填充进data
                let chartData1 = [] //图表的data部分
                let nn=''
                for( let len = 0 ; len < alltype.length ; len++){
                    if(alltype[len]=='original'){
                        nn='Original'
                    }else{
                        nn=alltype[len]
                    }
                    let item = {
                        type:'bar',
                        name: nn,
                        data:[],
                        barWidth: 5
                    }
                    chartData1.push(item)
                }

                for( let i in timeData.local ){  //所有时间段
                    for( let len = 0 ; len < alltype.length ; len++){
                        if( ( (timeData.local)[i] )[alltype[len]]  ||  ( (timeData.local)[i] )[alltype[len]] === 0 ){
                            const num = ( (timeData.local)[i] )[alltype[len]]
                            chartData1[len].data.push(num)
                        }
                    }
                }

                //倒序换算百分比
                for( let len = 0 ; len < chartData1.length ; len++) {
                    chartData1[len].data.reverse()
                    let total = 0
                    for( let flag = 0 ; flag < chartData1[len].data.length ; flag++) {
                        total = total + (chartData1[len].data)[flag]
                    }
                    for( let flag = 0 ; flag < chartData1[len].data.length ; flag++) {
                        (chartData1[len].data)[flag] = ( ( (chartData1[len].data)[flag] / total )*100 ).toFixed(2)
                    }
                }

                AppStore.data.testChartData[5].data = chartData1
            }

            //网络
            if( timeData ){
                let chartData2 = [] //图表的data部分
                let nn=''
                for( let len = 0 ; len < alltype.length ; len++){
                    if(alltype[len]=='original'){
                        nn='Original'
                    }else{
                        nn=alltype[len]
                    }
                    let item = {
                        type:'bar',
                        name: nn,
                        data:[],
                        barWidth: 5
                    }
                    chartData2.push(item)
                }

                for( let i in timeData.net ){  //所有时间段
                    for( let len = 0 ; len < alltype.length ; len++){
                        if( ( (timeData.net)[i] )[alltype[len]]  ||  ( (timeData.net)[i] )[alltype[len]] === 0 ){
                            const num = ( (timeData.net)[i] )[alltype[len]]
                            chartData2[len].data.push(num)
                        }
                    }
                }

                //倒序换算百分比
                for( let len = 0 ; len < chartData2.length ; len++) {
                    chartData2[len].data.reverse()
                    let total = 0
                    for( let flag = 0 ; flag < chartData2[len].data.length ; flag++) {
                        total = total + (chartData2[len].data)[flag]
                    }
                    for( let flag = 0 ; flag < chartData2[len].data.length ; flag++) {
                        (chartData2[len].data)[flag] = ( ( (chartData2[len].data)[flag] / total )*100 ).toFixed(2)
                    }
                }



                AppStore.data.testChartData[6].data = chartData2
            }


            //Math.max.apply(null, a) 取出最大值

            AppStore.emitChange("getchart2")
    });
    AppStore.emitChange("getchart1")
}


export function getVersion(){
    $.post("http://test.sla.weibo.cn/php/start.php?api=PerformGscale.getselect",AppStore.data.PortData.time,
    //$.post("/php/start.php?api=PerformGscale.getselect",
        function(data,status){
        console.log('....')
            console.log(data)

            data.data.android.push("All");
            AppStore.data.version.android=data.data.android.reverse()
            data.data.iphone.push("All");
            AppStore.data.version.iphone=data.data.iphone.reverse()


            console.log("获得的版本")
            console.log(data)
            AppStore.emitChange("getversion2")

        })

    AppStore.emitChange("getversion1")
}