/**
 * Created by ccy on 2017/2/20.
 */
import React, {Component} from 'react'

import DataChart from '../../Partials/DataAnalysis/DataChart'

import AppDispatcher from '../../../dispatcher/AppDispatcher'

import CollapsePart from './CollapsePart'

import ChartPart from '../../Partials/DataAnalysis/ChartPart'

import { Select } from 'antd';
const Option = Select.Option;

export default class BusinessPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }

        this.handleChange = this.handleChange.bind(this)
    }

    componentWillMount(){

    }

    handleChange(value){
        AppDispatcher.dispatch({
            action: 'CHANGE_SINGLE',
            data: value
        })
    }

    render() {
        const styles = {
            root: {
                width: '100%',
                height: 'auto',
              //  minHeight: '100%',
                margin: 0,
                padding: 0,
                position:'relative'
            },

        }

        return (
            <div style={styles.root}>

                <CollapsePart
                    tabdata1={this.props.data.testTableData1}
                    tabdata2={this.props.data.testTableData2}
                    chartData={this.props.data.testChartData}
                />

                <ChartPart
                    testChartData = {this.props.data.testChartData}
                />

            </div>
        )
    }
}