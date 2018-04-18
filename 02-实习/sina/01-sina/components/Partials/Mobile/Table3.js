/**
 * Created by ccy on 2017/2/9.
 */
import React , {Component} from 'react'

import '../../../node_modules/echarts/map/js/china'

import $ from 'jquery'

export default class Table3 extends Component{

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

        let myChart = echarts.init(document.getElementById('main3'));
        // 绘制图表

        myChart.setOption(
            {
                title : {
                    text: '南丁格尔玫瑰图',
                    subtext: '纯属虚构',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    x : 'center',
                    y : 'bottom',
                    data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                series : [
                    {
                        name:'面积模式',
                        type:'pie',
                        radius : [30, 110],
                        center : ['50%', '50%'],
                        roseType : 'area',
                        data:[
                            {value:10, name:'rose1'},
                            {value:5, name:'rose2'},
                            {value:15, name:'rose3'},
                            {value:25, name:'rose4'},
                            {value:20, name:'rose5'},
                            {value:35, name:'rose6'},
                            {value:30, name:'rose7'},
                            {value:40, name:'rose8'}
                        ]
                    }
                ]
            }
        );
    }

    render(){
        const styles = {
            root: {
                width: '530px',
                height: '400px',
                marginTop: 10,
                marginLeft: '10px',
                border: '1px solid rgb(214, 212, 212)',
                borderRadius: '3px',
                background: 'white',
                float: 'left'
            }
        }

        return(
            <div style={styles.root} id='main3' >

            </div>
        )
    }
}