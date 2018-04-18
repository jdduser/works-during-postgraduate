/**
 * Created by ccy on 2017/2/20.
 */
import React, {Component} from 'react'

import AppDispatcher from '../../../dispatcher/AppDispatcher'

import BusinessPage from '../../Partials/DataAnalysis/BusinessPage'
import AppStore from './../../../stores/AppStore'
import { Row, Col } from 'antd';

import { Select } from 'antd';
import moment from 'moment';
const Option = Select.Option;
//选择器

import { Affix} from 'antd';

import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

module.exports= class Test3 extends Component {

    constructor(props) {

        super(props)

        this.state = {
            buss_options:"iphone",
            version:"iphone",
            optiondis:false,
            yw:"refresh_feed",
            bb:"All"
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handleTap = this.handleTap.bind(this)
        this.ClickChange = this.ClickChange.bind(this)
    }
    /****/


    /**************************页面加载前********************************************/
    componentWillMount(){
        AppStore.addChangeListener(this._onChange.bind(this))
        //时间是最近一周的处理
        function getDateStr(value){
            var  year = value.getFullYear();
            var month = value.getMonth() + 1; // 记得当前月是要+1的
            month=month<10?('0' + month) : month;
            var dt = value.getDate()<10?('0' + value.getDate()) : value.getDate();
            var today = year + "-" + month + "-" + dt;
            return today;
        };

        var d = new Date();
        var d1 = new Date();

        d.setDate(d.getDate()-1);
        d1.setDate(d1.getDate()-7);
        const today=getDateStr(d);
        const todaybefore7=getDateStr(d1);
        const value = todaybefore7 + '-' + today
        //时间设为最近一周的时间
        AppDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                num : 4,
                value : value
            }
        })

        AppDispatcher.dispatch({
            action: 'GET_CHART',
            data: AppStore.data.PortData
        })

        console.log('will页面加载前获得版本信息')
        AppDispatcher.dispatch({
            action: 'GET_VERSION',
            data: {

            }
        })
        //发送数据请求
        console.log('will页面加载前发送数据端口：')
        console.log(AppStore.data.PortData)
        window.addEventListener('resize', this._resize.bind(this));
    }

    /**************************页面加载前********************************************/
    /***************AppStore数据改变后触发事件中回调函数的绑定******************************/
    componentDidMount(){


    }
    _onChange(){

        this.setState(AppStore)

    }
    //浏览器大小变化时重新渲染
    _resize(){
        AppStore.emitChange("changeport")

        //console.log('浏览器大小变化')

    }

    /***************AppStore数据改变后触发事件中回调函数的绑定******************************/

    /******************************************改变端口号对应事件**********************/
    handleChange(value){  //业务名

        this.setState({
            yw:value,

        })
        AppDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                num : 1,
                value : value
            }
        })


        AppDispatcher.dispatch({
            action: 'GET_CHART',
            data: AppStore.data.PortData
        })


    }

    handleClick(value){  //平台(选平台时联动改变业务名还有版本中的值)

        AppDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                num : 2,
                value : value
            }
        })
        AppDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                num : 1,
                value : 'refresh_feed'
            }
        })
        AppDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                num : 3,
                value : 'All'
            }
        })

        if(value.toString().trim()=='iPhone'){
            this.setState({
                buss_options:"iphone",
                version:"iphone",
                yw:'refresh_feed',
                bb:'All'
            })

        }
        else{
            this.setState({
                buss_options:"android",
                version:"android",
                yw:'refresh_feed',
                bb:'All'
            })

        }

        AppDispatcher.dispatch({
            action: 'GET_CHART',
            data: AppStore.data.PortData
        })
    }


    handleTap(value){ //版本

        this.setState({
            bb:value,

        })
        AppDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                num : 3,
                value : value
            }
        })

        AppDispatcher.dispatch({
            action: 'GET_CHART',
            data: AppStore.data.PortData
        })

    }

    ClickChange(value){ //颗粒度

        AppDispatcher.dispatch({
            action: 'CHANGE_PORT',
            data: {
                num : 5,
                value : value
            }
        })

        AppDispatcher.dispatch({
            action: 'GET_CHART',
            data: AppStore.data.PortData
        })
    }

    onChange(time, timeString) {  //时间
        const value = timeString[0] + '-' + timeString[1]


        var d = new Date();
        d.setDate(d.getDate()-1)
        var year = d.getFullYear();
        var month = d.getMonth() + 1; // 记得当前月是要+1的
        month=month<10?('0' + month) : month;
        var dt = d.getDate()<10?('0' + d.getDate()) : d.getDate();
        var today = year + "-" + month + "-" + dt;

        const a = Date.parse(timeString[0]);
        const b = Date.parse(today);
        const c = Date.parse(timeString[1]);

        if(a>b || c>b){
            alert("只能选择今天之前的日期！")
        }else{

            AppDispatcher.dispatch({
                action: 'CHANGE_PORT',
                data: {
                    num : 4,
                    value : value
                }
            })

            AppDispatcher.dispatch({
                action: 'GET_CHART',
                data: AppStore.data.PortData
            })
        }
    }

    /******************************************改变端口号对应事件**********************/


    render() {
        const styles = {
            root: {
                width: '100%',
                height: 'auto',
                minHeight: '100%',
                margin: '0',
                padding: '0',
                background: 'rgba(6, 63, 81, 0.79)',
            },
            affix:{
                position:'relative',
            },
            choose: {
                position:'absolute',
                width: '100%',
                height: 'auto',
                textAlign: 'center',
                padding: '10px 12% 10px 10%',
                boxShadow: 'rgba(25, 9, 9, 0.48) 0px 2px 2px',
                background: 'rgba(222, 231, 233, 0.83)',
            },
            content: {
                width: '100%',
                height: 'auto',
                minHeight: '100%',
                margin: '130px 0px 0px 0px',

            },
            row:{
                height:'50px',
                margin:'0px 0px 0px 0px',
                padding:'20px'
            },
            col:{
                padding:'10px 0px'
            }

        }

        /***根据平台选择展现业务中的内容**/
        var option='';
        var bussstr=[]

        for( let k in AppStore.data.setting[this.state.buss_options] ){
            bussstr.push({'key':k,'value':AppStore.data.setting[this.state.buss_options][k]});
        }
        const tab1 = bussstr.map(obj => {
            option=option +tab1;
            return(
                   <Option value={obj.key} key={obj.key}>{obj.value}</Option>

            )
        });
        /***根据平台选择展现业务中的内容**/

        /***根据平台选择展现版本中的内容**/
        var option1='';
        var verstr=[]

       for( let k in AppStore.data.version[this.state.version] ){
            verstr.push({'key':AppStore.data.version[this.state.version][k],'value':AppStore.data.version[this.state.version][k]});
        }
        const tab2 = verstr.map(obj => {

                return(
                <Option value={obj.value}  key={obj.key}>{obj.value}</Option>)
        });
        const dateFormat = 'YYYY/MM/DD';
        /***根据平台选择展现版本中的内容**/


        //处理日期选择范围
        function disabledDate(current) {
            return current && current.valueOf() > Date.now()-24*60*60;

        }
        //处理日期
        function getDateStr(value){
            var  year = value.getFullYear();
            var month = value.getMonth() + 1; // 记得当前月是要+1的
            month=month<10?('0' + month) : month;
            var dt = value.getDate()<10?('0' + value.getDate()) : value.getDate();
            var today = year + "/" + month + "/" + dt;
            return today;
        };

        var d = new Date();
        d.setDate(d.getDate()-1);
        var d1 = new Date();
        d1.setDate(d1.getDate()-7);


        let today=getDateStr(d);
        let todaybefore7=getDateStr(d1);



        return (
            <div style={styles.root}>
                <div >
                    <Row >
                        <Col>
                                <div style={styles.choose} className="choose">
                                    <Row gutter={16} >
                                        <Col>
                                    <div>
                                        <Row gutter={16}>
                                            <Col xs={8}  md={8} lg={4} style={styles.col}>
                                                <span>平台：</span>
                                                <Select defaultValue="iPhone" style={{ width: '70%'}} size="large" onChange={this.handleClick}>
                                                    <Option value="iPhone">iPhone</Option>
                                                    <Option value="android">Android</Option>
                                                </Select>
                                            </Col>

                                            <Col xs={8} md={8} lg={4}  style={styles.col}>
                                                <span>业务名：</span>
                                                <Select defaultValue="refresh_feed" value={this.state.yw} style={{ width: '65%',}} size="large" onChange={this.handleChange}>
                                                    {tab1}
                                                </Select>

                                            </Col>

                                            <Col xs={8}  md={8} lg={4}  style={styles.col}>
                                                <span>版本：</span>
                                                <Select   defaultValue="All" value={this.state.bb}style={{ width: '70%', }} size="large" onChange={this.handleTap}>
                                                    {tab2}
                                                </Select>
                                            </Col>

                                            <Col xs={16} md={16} lg={8}  style={styles.col}>
                                                <span>时间：</span>
                                                <RangePicker style={{width: '85%' }}defaultValue={[moment(todaybefore7, dateFormat), moment(today, dateFormat)]} 
                                                             disabledDate={disabledDate} format={dateFormat} size="large"  onChange={this.onChange}/>
                                            </Col>

                                            <Col xs={8} md={8} lg={4}  style={styles.col}>
                                                <span>颗粒度：</span>
                                                <Select defaultValue="d" style={{ width: '60%' }} size="large" onChange={this.ClickChange}>
                                                    <Option value="d">一天</Option>
                                                    <Option value="w">一周</Option>
                                                </Select>
                                            </Col>

                                        </Row>
                                    </div>
                                        </Col>
                                    </Row>
                                </div>
                        </Col>
                    </Row>
                </div>

                <div style={styles.content}>
                    <Row>
                        <Col xs={1} md={2} lg={2} >
                        </Col>
                        <Col xs={22} md={20} lg={20} >
                            <BusinessPage data={AppStore.data} />
                        </Col>
                        <Col xs={1} md={2} lg={2} >
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

