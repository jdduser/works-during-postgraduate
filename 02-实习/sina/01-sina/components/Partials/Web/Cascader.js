/**
 * Created by ccy on 2017/1/5.
 */
import React , {Component} from 'react'

import { Cascader } from 'antd';

import { Radio } from 'antd';

import {Icon} from 'antd'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const options = [
    {
        value: 'MAU',
        label: 'MAU（月活跃用户）',
        children: [
            {
                value: 'number',
                label: '人数'
            },
            {
                value: 'allnum',
                label: '月访问总数'
            }
        ]
    },
    {
        value: 'DAU',
        label: 'DAU（日活跃用户）',
        children: [
            {
                value: 'number',
                label: '人数'
            },
            {
                value: 'allnum',
                label: '日访问总数'
            }
        ]
    },
    {
        value: 'time',
        label: '时长',
        children: [
            {
                value: 'singletime',
                label: '单次访问时长'
            },
            {
                value: 'persontime',
                label: '人均日访问时长'
            }
        ]
    },
    {
        value: 'tenacity',
        label: '粘连度',
        children: [
            {
                value: 'tenacity',
                label: '用户粘连度'
            }
        ]
    }
    ]

export default class Cascaders extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectedTags: []
        }

        this.onChange = this.onChange.bind(this)
    }

    onChange(value,selectedOptions){
        console.log(selectedOptions[1].label)

        // const key  = selectedOptions[1].label
        // let selectArr = this.state.selectedTags
        // selectArr.push(key)
        // this.setState({
        //     selectedTags : selectArr
        // })
    }

    render(){
        const styles = {
            root: {
                width: '250px',
                height: '90%',
                marginTop: '2%',
                marginLeft: '10px',
                border: '1px solid rgb(214, 212, 212)',
                borderRadius: '3px',
                background: 'white',
                float: 'left'
            },
            output: {
                width: '90%',
                marginLeft:'5%',
                border: '1px solid rgb(217, 217, 217)',
                marginTop:'5px',
                height: '250px'
            },
            item: {
                height: '24px',
                width: 'auto',
                background: 'rgba(189, 187, 187, 0.29)',
                margin: '3px',
                padding: '3px',
                float: 'left',
                lineHeight: '20px',
                borderRadius: '3px'
            },
            title: {
                height: '20px',
                width: '100%'
            },
            content: {
                width: '100%',
                height: 'auto'
            }
        }

        let items = this.state.selectedTags.map(obj => {
            return(
                <div style={styles.item}>
                    <div style={{width:'auto',height:'100%',float:'left'}}>{obj}</div>
                    <div
                        style={{width:'10px',height:'100%',float:'left',cursor:'pointer',marginLeft:'3px'}}
                        value={obj}
                        onClick={this.handleClick}
                    ><Icon type="close" /></div>
                </div>
            )
        })

        return(
            <div style={styles.root} id={this.props.index} >
                <Cascader
                    options={options}
                    style={{width:'90%',marginTop:'10px',marginLeft:'5%'}}
                    onChange={this.onChange}
                />

                <div style={styles.output}>
                    <div style={styles.title}>

                    </div>
                    <div style={styles.content}>
                        {items}
                    </div>
                </div>

                <div style={{marginTop:'10px',marginLeft:'53px'}}>
                    <RadioGroup defaultValue="line" size="large">
                        <RadioButton value="line">折线图</RadioButton>
                        <RadioButton value="bar">柱状图</RadioButton>
                        {/*<RadioButton value="c">饼图</RadioButton>*/}
                    </RadioGroup>
                </div>

            </div>
        )
    }
}