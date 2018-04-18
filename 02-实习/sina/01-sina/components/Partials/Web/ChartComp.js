/**
 * Created by ccy on 2017/1/5.
 */
import React , {Component} from 'react'

import Cascaders from '../../Partials/Web/Cascader'

import DynChart from '../../Partials/Web/DynChart'

import Exit from '../../Partials/Web/Exit'

import AppDispatcher from '../../../dispatcher/AppDispatcher'

export default class ChartComp extends Component{

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
                padding: '0',
                margin: '0'
            },
            text: {
                fontSize: 18,
                marginLeft: 10,
                width: '100%'
            }
        }

        const num = this.props.index

        const chartsData = this.props.showChart[num]

        return(
            <div style={styles.root} id={this.props.index}>
                {/*<Cascaders index={this.props.index}/>*/}
                <span style={styles.text}>{chartsData.title}</span>
                <DynChart index={ 'chart' + this.props.index} chartData={chartsData} />
                {/*<Exit index={this.props.index}/>*/}
            </div>
        )
    }

}