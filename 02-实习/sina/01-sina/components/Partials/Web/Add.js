/**
 * Created by ccy on 2017/1/5.
 */
import React , {Component} from 'react'

import {Icon} from 'antd'

import { Button } from 'antd';

import AppDispatcher from '../../../dispatcher/AppDispatcher'

export default class Add extends Component{
    constructor(props){
        super(props)
        this.state = {
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e){
        console.log('click!')

        AppDispatcher.dispatch({
            action: 'CHANGE_CHARTSPART',
            data: 666
            //666表示添加一个图表div
        })
    }


    render(){
        const styles = {
            root: {
                width: '112px',
                height: '32px',
                padding: '0',
                position: 'relative',
                // top: '520px',
                // left: '600px',
                margin: '30px 47% 30px auto',
                background: 'white',
                boxShadow: 'rgba(12, 12, 12, 0.28) 8px 8px 5px',
                cursor: 'pointer',
                borderRadius: '3px'
            }
        }

        return(
            <div style={styles.root} onClick={this.handleClick}>
                {/*<div style={styles.icon}>*/}
                    {/*<Icon type="plus" />*/}
                    {/*<span style={{fontSize: '14px'}}>添加新图表</span>*/}
                {/*</div>*/}

                <div>
                    <Button type="ghost" size='large'>+添加新图表</Button>
                </div>
            </div>
        )
    }
}