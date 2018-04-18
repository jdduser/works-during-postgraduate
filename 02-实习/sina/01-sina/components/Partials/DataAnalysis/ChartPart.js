/**
 * Created by ccy on 2017/2/28.
 */
import React, {Component} from 'react'

import DataChart from '../../Partials/DataAnalysis/DataChart'

import AppDispatcher from '../../../dispatcher/AppDispatcher'

import { Select } from 'antd';
const Option = Select.Option;

    export default class ChartPart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            choose : 5
        }

        this.handleChange = this.handleChange.bind(this)
    }

    componentWillMount(){

    }

    handleChange(value){
        // AppDispatcher.dispatch({
        //     action: 'CHANGE_SINGLE',
        //     data: value
        // })
        this.setState({
            choose: value
        })
    }

    render() {
        const styles = {
            root: {
                width: '100%',
                height: 'auto',
                minHeight: '100%',
                margin: 0,
                padding: '0px 0px 30px 0px'
            },
            chartdiv :{
                width: '100%',
                height: '370px',
                marginBottom: '30px',
                borderRadius: 5,
                background: 'white'
            }
        }


        return (
            <div style={styles.root}>
                <div style={styles.chartdiv}>
                    <DataChart chartData = {this.props.testChartData[4]} index={3} ></DataChart>
                </div>

                <div style={styles.chartdiv}>
                    <DataChart chartData = {this.props.testChartData[this.state.choose]} index={4} ></DataChart>
                    <div style={{float:'right',zIndex: 100,position:'relative',margin:'-340px 70px auto auto'}}>
                        <Select defaultValue="5" style={{ width: 120 }} onChange={this.handleChange}>
                            <Option value="5">本地耗时</Option>
                            <Option value="6">网络耗时</Option>
                        </Select>
                    </div>
                </div>
            </div>
        )
    }
}