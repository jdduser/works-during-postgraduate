/**
 * Created by ccy on 2017/1/5.
 */
import React , {Component} from 'react'

import {Icon} from 'antd'

import AppDispatcher from '../../../dispatcher/AppDispatcher'

export default class Exit extends Component{
    constructor(props){
        super(props)
        this.state = {

        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e){
        const value = e.currentTarget.getAttribute('value')

        AppDispatcher.dispatch({
            action: 'CHANGE_CHARTSPART',
            data: value
            //666表示添加一个图表div
        })
    }

    render(){
        const styles = {
            root: {
                width: '40px',
                height: '40px',
                float: 'left',
                marginTop: '2%',
                marginLeft: '10px',
                fontSize: '20px'
            }
        }
        return(
            <div style={styles.root}>
                <Icon type="close-circle" onClick={this.handleClick} value={this.props.index}/>
            </div>
        )
    }
}