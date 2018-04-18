/**
 * Created by ccy on 2017/2/28.
 */

import React, {Component} from 'react'

import DataChart from '../DataAnalysis/DataChart'

import AppDispatcher from '../../../dispatcher/AppDispatcher'

import { Select } from 'antd';
const Option = Select.Option;

import { Row, Col } from 'antd';

import { Collapse } from 'antd';
const Panel = Collapse.Panel;

export default class CollapsePart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            choose: 1,
            flash: true
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value){
        this.setState({
            choose: value
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
                background:'rgba(6, 63, 81, 0.79)'
            },
            tab: {
                width: '100%',
                textAlign: 'center',
                fontSize:'12px',
                marginTop:'20px'
            },
            chart: {
                width: '100%',
                height: '300px',
                border: '1px solid lightgrey',
                marginTop: '10px',
                borderRadius: 5
            },
            row1: {
                height: 'auto',
                borderRight: '1px solid grey'
            },
            col: {
                borderLeft: '1px solid grey',
                borderTop: '1px solid grey',
                height: '30px',
                lineHeight: '30px'
            },
            col1:{
                borderLeft: '1px solid grey',
                borderTop: '1px solid grey',
                height: '40px',
                lineHeight:'40px'
            },
            customPanelStyle:{
              // position:'absolute',
                background: '#f7f7f7',
                borderRadius: 4,
                marginBottom: 30,
                border: 0,
                fontSize:'17px',
                fontWeight:'500',
                paddingTop:'20px',
                paddingBottom:'60px',
            },
        }


        //接入表格1的数据
        const tableData1 = this.props.tabdata1

        const tab1 = tableData1.variation.map(obj => {

            let diff = obj.Success - tableData1.Original.Success
            diff=diff.toFixed(2)
            let color="red"
            if(diff>0){
                color="green"
            }
            return(
                <Row style={styles.row1} key={ Math.random() } >
                    <Col span={6} style={styles.col}>{obj.name}</Col>
                    <Col span={4} style={styles.col}>{obj.PV}</Col>
                    <Col span={4} style={styles.col}>{obj.UV}</Col>
                    <Col span={5} style={styles.col}>{obj.Success}</Col>
                    <Col span={5} style={{borderLeft: '1px solid grey', borderTop: '1px solid grey', height: '30px', lineHeight: '30px',color:color}}>{diff}</Col>
                </Row>
            )
        });

        //接入表格2的数据
        const tableData2 = this.props.tabdata2
        const tab2 = tableData2.variation.map(obj => {

            const aver_diff = ( obj.aver - tableData2.Original.平均耗时 ).toFixed(2)
            const local_diff = ( obj.local - tableData2.Original.本地耗时 ).toFixed(2)
            const net_diff = ( obj.net - tableData2.Original.网络耗时 ).toFixed(2)
            let avecolor="green"
            let localcolor="green"
            let netcolor="green"
            if(aver_diff>0){
                avecolor="red"
            }
            if(local_diff>0){
                localcolor="red"
            }
            if(net_diff>0){
                netcolor="red"
            }
            return(
                <Row style={styles.row1} key={ Math.random() }>
                    <Col span={3} style={styles.col}>{obj.name}</Col>
                    <Col span={3} style={styles.col}>{obj.aver}</Col>
                    <Col span={4} style={{borderLeft: '1px solid grey', borderTop: '1px solid grey', height: '30px', lineHeight: '30px',color:avecolor}}>{aver_diff}</Col>
                    <Col span={3} style={styles.col}>{obj.local}</Col>
                    <Col span={4} style={{borderLeft: '1px solid grey', borderTop: '1px solid grey', height: '30px', lineHeight: '30px',color:localcolor}}>{local_diff}</Col>
                    <Col span={3} style={styles.col}>{obj.net}</Col>
                    <Col span={4} style={{borderLeft: '1px solid grey', borderTop: '1px solid grey', height: '30px', lineHeight: '30px',color:netcolor}}>{net_diff}</Col>
                </Row>
            )
        });

        //右上角最大成功率显示计算
        let tab1_maxname = 'Original'
        let tab1_max = tableData1.Original.Success

        const varArray = tableData1.variation
        for( let len = 0 ; len < varArray.length ; len++){
            if( varArray[len].Success > tab1_max ){
                tab1_max = varArray[len].Success
                tab1_maxname = varArray[len].name
            }
        }
        tab1_max = ( tab1_max - tableData1.Original.Success ) .toFixed(2)
        tab1_max=(isNaN(tab1_max)?'0.00':tab1_max);
        let successcolor="black"
        if(tab1_max>0){
            successcolor="green"
        }
        if(tab1_max<0){
            successcolor="red"
        }
        const tabItem1 = (
            <div>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <span style={{fontSize:20}}>成功率概况</span>
                    </Col>
                </Row>
                <Row>

                    <span style={{float: 'right',marginRight: '30px',color: successcolor}}>{tab1_max}%</span>
                    <span style={{float: 'right',}}>成功率增幅：</span>
                    <span style={{float: 'right',color: 'blue',marginRight: '10px'}}>{tab1_maxname}</span>
                    <span style={{float: 'right',marginRight: '0px'}}>成功率更高：</span>
                </Row>
            </div>
        );

        //右上角最大成功率显示计算
        let tab2_maxname = 'Original'
        let tab2_max =  tableData2.Original.平均耗时

        const varArray2 = tableData2.variation
        for( let len = 0 ; len < varArray2.length ; len++){
            if( varArray2[len].aver < tab2_max ){
                tab2_max = varArray2[len].aver
                tab2_maxname = varArray2[len].name
            }
        }

        tab2_max = (tab2_max - tableData2.Original.平均耗时)
        tab2_max = tab2_max.toFixed(2)
        let speedcolor="black"
        if(tab2_max>0){
            speedcolor="red"
        }
        if(tab2_max<0){
            speedcolor="green"
        }
        const tabItem2 = (
            <div>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <span style={{fontSize:20}}>速度分析</span>
                    </Col>
                </Row>
                <Row>
                    <span style={{float: 'right',marginRight: '30px',color: speedcolor}}>{-tab2_max}s</span>
                    <span style={{float: 'right',}}>平均耗时下降：</span>
                    <span style={{float: 'right',marginRight: '10px',color: 'blue'}}>{tab2_maxname}</span>
                    <span style={{float: 'right',marginRight: '0px'}}>速度更快：</span>
                </Row>

            </div>
        );

        return (
            <div >
               <Row>
                   <Col xs={24} sm={24} md={24} lg={24}>
                        <Collapse bordered={false} defaultActiveKey="1" >
                        <Panel header={tabItem1} key="1" style={styles.customPanelStyle}>
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24}>
                            <div style={styles.tab}>
                                <Row style={styles.row1}>
                                    <Col span={6} style={styles.col}>Variation</Col>
                                    <Col span={4} style={styles.col}>PV</Col>
                                    <Col span={4} style={styles.col}>UV</Col>
                                    <Col span={5} style={styles.col}>成功率(%)</Col>
                                    <Col span={5} style={styles.col}>相比Original(%)</Col>
                                </Row>
                                <Row style={styles.row1}>
                                    <Col span={6} style={styles.col}>Original</Col>
                                    <Col span={4} style={styles.col}>{tableData1.Original.PV}</Col>
                                    <Col span={4} style={styles.col}>{tableData1.Original.UV}</Col>
                                    <Col span={5} style={styles.col}>{tableData1.Original.Success}</Col>
                                    <Col span={5} style={styles.col}>*</Col>
                                </Row>
                                {tab1}
                                <Row style={{borderBottom: '1px solid grey'}}></Row>
                            </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24}>
                            <div style={styles.chart}>
                                <DataChart chartData = {this.props.chartData[0]} index={1} ></DataChart>
                            </div>
                                </Col>
                            </Row>

                        </Panel>
                        </Collapse>
                   </Col>
               </Row>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24}>
                <Collapse bordered={false}defaultActiveKey="1">

                    <Panel header={tabItem2} key="1" style={styles.customPanelStyle}>
                        <div style={styles.tab}>
                            <Row style={{borderRight: '1px solid grey',}}>
                                <Col span={3} style={styles.col1}>Variation</Col>
                                <Col span={3} style={styles.col1}>平均耗时</Col>
                                <Col span={4} style={styles.col1}>相比Original</Col>
                                <Col span={3} style={styles.col1}>本地耗时</Col>
                                <Col span={4} style={styles.col1}>相比Original</Col>
                                <Col span={3} style={styles.col1}>网络耗时</Col>
                                <Col span={4} style={styles.col1}>相比Original</Col>
                            </Row>

                            <Row style={styles.row1}>
                                <Col span={3} style={styles.col}>Original</Col>
                                <Col span={3} style={styles.col}>{tableData2.Original.平均耗时}</Col>
                                <Col span={4} style={styles.col}>*</Col>
                                <Col span={3} style={styles.col}>{tableData2.Original.本地耗时}</Col>
                                <Col span={4} style={styles.col}>*</Col>
                                <Col span={3} style={styles.col}>{tableData2.Original.网络耗时}</Col>
                                <Col span={4} style={styles.col}>*</Col>
                            </Row>
                            {tab2}
                            <Row style={{borderBottom: '1px solid grey'}}></Row>
                            <Row style={{height:30,marginTop:20}}>
                                <Col xs={14} sm={16} md={16} lg={18}>

                                </Col>
                                <Col xs={10} sm={8} md={8} lg={6}>单位：(s)

                                </Col>
                            </Row>
                        </div>

                        <div style={styles.chart}>

                            <DataChart chartData = {this.props.chartData[this.state.choose]} index={2} ></DataChart>

                            <div style={{float:'right',zIndex: 100,position:'relative',margin:'-280px 10px auto auto'}}>
                                <Select defaultValue="1" style={{ width: 120 }} onChange={this.handleChange}>
                                    <Option value="1">平均耗时</Option>
                                    <Option value="2">本地耗时</Option>
                                    <Option value="3">网络耗时</Option>
                                </Select>
                            </div>

                        </div>
                    </Panel>
                </Collapse>
                    </Col>
                </Row>

            </div>
        )
    }
}