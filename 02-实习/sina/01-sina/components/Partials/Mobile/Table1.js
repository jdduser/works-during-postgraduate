/**
 * Created by ccy on 2017/2/8.
 */
import React , {Component} from 'react'

import $ from 'jquery'

export default class Table1 extends Component{

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

        // const dom = $('#' + 'main')
        //
        // dom.css({
        //     width: dom.width(),
        //     height: dom.height()
        // })

        let echarts = require('echarts');
        // 基于准备好的dom，初始化echarts实例

        let myChart = echarts.init(document.getElementById('main'));
        // 绘制图表

        myChart.setOption({
            tooltip: {
                trigger: 'axis'
            },
            // toolbox: {
            //     feature: {
            //         dataView: {show: true, readOnly: false},
            //         magicType: {show: true, type: ['line', 'bar']},
            //         restore: {show: true},
            //         saveAsImage: {show: true}
            //     }
            // },
            legend: {
                data:['蒸发量','降水量','平均温度']
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '水量',
                    min: 0,
                    max: 250,
                    interval: 50,
                    axisLabel: {
                        formatter: '{value} ml'
                    }
                },
                {
                    type: 'value',
                    name: '温度',
                    min: 0,
                    max: 25,
                    interval: 5,
                    axisLabel: {
                        formatter: '{value} °C'
                    }
                }
            ],
            grid: {
                left: '40px',
                right: '40px',
                bottom: '10px',
                top:'35px',
                containLabel: true
            },
            series: [
                {
                    name:'蒸发量',
                    type:'bar',
                    data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                },
                {
                    name:'降水量',
                    type:'bar',
                    data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                },
                {
                    name:'平均温度',
                    type:'line',
                    yAxisIndex: 1,
                    data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                }
            ]
    });
    }

    render(){
        const styles = {
            root: {
                width: '940px',
                height: '170px',
                marginTop: 5,
                marginLeft: '10px',
                border: '1px solid rgb(214, 212, 212)',
                borderRadius: '3px',
                background: 'white',
                float: 'left'
            }
        }

        return(
            <div style={styles.root} id='main' >

            </div>
        )
    }
}