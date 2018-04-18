/**
 * Created by ccy on 2017/2/8.
 */
import React, {Component} from 'react'

import { Tabs } from 'antd';

import DauPage from '../../Partials/Mobile/DauPage'

import MauPage from '../../Partials/Mobile/MauPage'

import DurationPage from '../../Partials/Mobile/DurationPage'

import AppDispatcher from '../../../dispatcher/AppDispatcher'

const TabPane = Tabs.TabPane;

export default class Test1 extends Component {

    constructor(props) {

        super(props)

        this.state = {
        }
    }

    componentWillMount(){
        AppDispatcher.dispatch({
            action: 'GET_CHARTSDATA'
        })
    }

    render() {

        const styles = {
            root: {
                width: '100%',
                height: '100%',
                margin: '0',
                padding: 0
            },
            tab: {
                //width: 'calc(100% - 240px - 12px)',
                width: '1100px',
                height: '100%',
                float: 'left'
                //overflow: 'scroll'
            },
            font: {
                textAlign: 'center',
                width: '200px',
            },
            text: {
                fontSize: 20
            },
            menu: {
                width: '300px',
                height: '100%',
                borderRight: '1px solid #cecece',
                position: 'absolute',
                left: 0,
                top: 0,
                float: 'left'
            }
        }

        const rise = (
            <span  style={{color: '#e24242'}}>↑</span>
        )

        const lower = (
            <span style={{color: '#2fc72f'}}>↓</span>
        )

        const item1 = (
            <div style={styles.font}>
                <p>DAU</p>
                <p style={styles.text}>{this.props.data.tabsNum.dau[0]}千万</p>
                { this.props.data.tabsNum.dau[2] == 0 ? rise : lower} <span>{this.props.data.tabsNum.dau[1]}% </span>
            </div>
        )

        const item2 = (
            <div style={styles.font}>
                <p>MAU</p>
                <p style={styles.text}>{this.props.data.tabsNum.mau[0]}亿</p>
                { this.props.data.tabsNum.mau[2] == 0 ? rise : lower} <span>{this.props.data.tabsNum.mau[1]}% </span>
            </div>
        )

        const item3 = (
            <div style={styles.font}>
                <p>时长</p>
                <p style={styles.text}>{this.props.data.tabsNum.duration[0]}分钟</p>
                { this.props.data.tabsNum.duration[2] == 0 ? rise : lower} <span>{this.props.data.tabsNum.duration[1]}% </span>
            </div>
        )

        const item4 = (
            <div style={styles.font}>
                <p> ● 暂无</p>
                <p style={styles.text}>xxx</p>
                <span  style={{color: '#2fc72f'}}>x</span><span>xxx</span>
            </div>
        )

        return (
            <div style={styles.root}>
                <div style={styles.tab}>
                    <Tabs defaultActiveKey="1" size="default">
                        <TabPane
                            tab={item1}
                            key="1"
                        >
                            <DauPage showChart={this.props.data.showChart}/>
                        </TabPane>

                        <TabPane
                            tab={item2}
                            key="2"
                        >
                            <MauPage showChart={this.props.data.showChart}/>
                        </TabPane>

                        <TabPane
                            tab={item3}
                            key="3"
                        >
                            <DurationPage showChart={this.props.data.showChart}/>
                        </TabPane>

                        {/*<TabPane*/}
                        {/*tab={item4}*/}
                        {/*key="4"*/}
                        {/*>*/}

                        {/*</TabPane>*/}

                    </Tabs>
                </div>
            </div>
        )
    }
}