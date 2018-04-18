/**
 * Created by ccy on 2017/1/5.
 */
import React , {Component} from 'react'

import $ from 'jquery'


export default class DynChart extends Component{

    constructor(props){
        super(props)
        this.state = {

        }

        this.initLine = this.initLine.bind(this)
    }

    componentDidMount() {
        this.initLine()
    }

    componentDidUpdate(){
        this.initLine()
    }

    initLine(){

        const dom = $('#' + this.props.index)

        const chartData = this.props.chartData

        dom.css({
            width: dom.width(),
            height: dom.height()
        })

        //
        //标注的处理部分，对有markpoint的图表进行单个处理
        if( (chartData.data[0]).markPoint ){ //存在markPoint这个部分
            const barArray = (chartData.data[0]).data
            const lineArray = (chartData.data[1]).data

            for( let i = 0 ; i < barArray.length ; i++){
                let diff = lineArray[i] - barArray[i]
                if( barArray[i] > 0 && diff > 0 && ( Math.abs(diff/lineArray[i]) > 0.05 ) ){
                    let obj = {
                        name: '低于均线超过5%',
                        coord: [ i , barArray[i]]
                    }
                    chartData.data[0].markPoint.data.push(obj)
                    console.log(obj)
                }
            }
        }
        //
        //

        let echarts = require('echarts');
        // 基于准备好的dom，初始化echarts实例

        let myChart = echarts.init(document.getElementById(this.props.index));
        // 绘制图表

        myChart.setOption({
            title : {
                show: true,
                text: this.props.chartData.title,
                textStyle : {
                    fontSize: 14,
                    fontStyle: 'lighter'
                },
                left: 30,
                top: 15
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data: chartData.type ,
                right: 65,
                top: 15
            },
            toolbox: {
                show : false,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line','bar']},
                    restore : {show: false},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    name: chartData.x,
                    boundaryGap : chartData.boundaryGap,
                    data : chartData.xAxisData,
                    alignWithLabel: true
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name: chartData.y
                }
            ],
            grid: {
                left: '40px',
                right: '70px',
                bottom: '15px',
                top:'75px',
                containLabel: true
            },
            dataZoom: [
                {
                    show: chartData.dataZoom,
                    start: ((chartData.xAxisData).length >= 12 ? 50:0),
                    end: 100,
                    height: 20,
                    filterMode: 'empty',
                    bottom: 10
                },
                {
                    type: 'inside',
                    start: ((chartData.xAxisData).length >= 12 ? 50:0),
                    end: 100,
                    showDetail: 'false'
                }
            ],
            series: chartData.data ,
        });
    }

    render(){
        const styles = {
            root: {
                width: '100%',
                height: '90%',
                marginTop: 5,
                marginLeft: '10px',
                border: '1px solid rgb(214, 212, 212)',
                borderRadius: '3px',
                background: 'white',
                float: 'left'
            }
        }

        return(
            <div style={styles.root} id={this.props.index} >

            </div>
        )
    }
}