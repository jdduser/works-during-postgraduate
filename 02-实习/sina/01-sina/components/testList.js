/**
 * Created by chaijiang on 2017/5/8.
 */
var React = require('react');
var ListStore = require('../stores/ListStorettt');
var AppDispatcher = require('../dispatcher/AppDispatcherttt');
import { Row, Col } from 'antd';
import { Select } from 'antd';

var testList = React.createClass({
    getInitialState: function () {
        return {
            items: ListStore.items
        };
    },
    componentWillMount: function() {
        this.getInitialState();
        ListStore.addChangeListener(this._onChange);
    },
    componentDidMount: function() {
        ListStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        ListStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState({
            items: ListStore.items
        });
    },

    click:function(){
        AppDispatcher.dispatch({
            actionType: 'get',
        });
    },

    render(){
        console.log('rnder')
        let itemHtml = this.state.items.map(function (listItem, i) {
            return(
               <Row>
                   <Col span={8}>
                       {listItem.NO}
                   </Col>
                   <Col span={8}>
                       {listItem.name}
                   </Col>
                   <Col span={8}>
                       {listItem.sex}
                   </Col>
               </Row>
            );
        });


        return(
            <div>
                <div style={{height:100,background:'#ccc'}}>
                    <Row>
                        <Col span={12}>
                            <Select style={{ width: '70%'}} size="large">
                                <Option value="t1">t1</Option>
                                <Option value="t1">t2</Option>
                            </Select>
                        </Col>
                        <Col span={12}>
                            <Select style={{ width: '70%'}} size="large">
                                <Option value="t1">t1</Option>
                                <Option value="t1">t2</Option>
                            </Select>
                        </Col>
                    </Row>
                </div>
                <div style={{height:100,background:'#ccc'}}>
                {itemHtml}
                </div>
            </div>
        )
    }


})

module.exports = testList;