/**
 * Created by ccy on 2017/2/8.
 */
import React, {Component} from 'react'

import DynChart from '../../Partials/Web/DynChart'

import { Popover } from 'antd';

export default class DauPage extends Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){
        const styles = {
            root: {
                width: '100%',
                height: '100%',
                margin : 0,
                padding: 0,
                overflow: 'scroll'
            },
            tab1: {
                width: '980px',
                height: '300px'
            }
        }

        const chartsData1 = this.props.showChart[2]
        const chartsData2 = this.props.showChart[3]
        const chartsData3 = this.props.showChart[6]

        const content1 = (
            <div style={{width:'200px'}}>
                {chartsData1.introduction1}
                <p/>
                {chartsData1.introduction2}
            </div>
        )

        const content2 = (
            <div style={{width:'200px'}}>
                {chartsData2.introduction1}
                <p/>
                {chartsData2.introduction2}
            </div>
        )

        const content3 = (
            <div style={{width:'200px'}}>
                {chartsData3.introduction1}
                <p/>
                {chartsData3.introduction2}
            </div>
        )

        return(
            <div style={styles.root}>
                <div style={styles.tab1}>
                    <div style={{width: '15px',height: '15px',background: 'lightgrey',position: 'absolute',top: 15,left: 960,zIndex: 990,paddingLeft: '4px'}}>
                        <Popover placement="left" title={chartsData1.title} content={content1}>
                            <span style={{color:'white'}}> ？</span>
                        </Popover>
                    </div>
                    <DynChart index={2} chartData={chartsData1}/>
                </div>
                <div style={styles.tab1}>
                    <div style={{width: '15px',height: '15px',background: 'lightgrey',position: 'absolute',top: 315,left: 960,zIndex: 990,paddingLeft: '4px'}}>
                        <Popover placement="left" title={chartsData2.title} content={content2}>
                            <span style={{color:'white'}}> ？</span>
                        </Popover>
                    </div>
                    <DynChart index={3} chartData={chartsData2}/>
                </div>
                <div style={styles.tab1}>
                    <div style={{width: '15px',height: '15px',background: 'lightgrey',position: 'absolute',top: 615,left: 960,zIndex: 990,paddingLeft: '4px'}}>
                        <Popover placement="left" title={chartsData3.title} content={content3} >
                            <span style={{color:'white'}}> ？</span>
                        </Popover>
                    </div>
                    <DynChart index={6} chartData={chartsData3}/>
                </div>
            </div>
        )
    }
}