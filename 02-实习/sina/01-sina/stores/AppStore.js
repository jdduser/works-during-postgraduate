var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AppStore =Object.assign({}, EventEmitter.prototype, {
    data: {
        loading: false,
        ready: false,
        redirect: null,
        token: '',


        //版本控制
        ediData: {},

        //时间选择组件状态值
        timeChoose: true,

        //图表显示内容的状态值
        chooseData: 0,




        //
        // qiuchen
        //

        chartData:{},
        chartsData:[0,1,2,3,4,5,6],

        showChart:[
            {
                title: '月活跃用户人数分布',
                text: 'MONTHLY ACTIVE USERS',
                x: '月',
                y: '人',
                type: ['全部','用户','访客'],
                xAxisData: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                //xAxisData: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'],
                boundaryGap: false,
                introduction1:'公式：MAU',
                introduction2:'定义：月活跃用户数量，与dau一起用来衡量服务的用户粘性以及衰退周期。',
                dataZoom: false,
                data:[
                    {
                        type: 'line',
                        name: '全部',
                        data: [14000,10320,15000,12300,15000,13070,15600,12000,16000,13000,12500,14700]
                    },
                    {
                        type: 'line',
                        name: '用户',
                        data: [10000,10020,12000,11000,12000,12000,11000,10000,13000,11000,12000,12000]
                    },
                    {
                        type: 'line',
                        name: '访客',
                        data: [4000,2300,3000,1300,3000,1070,4600,2000,3000,2000,2500,2700]
                    }
                ]
            },
            {
                title: '月活跃用户访问总数',
                text: 'TOTAL MONTHLY USERS',
                x: '月',
                y: '次',
                type: ['全部'],
                xAxisData: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                //xAxisData: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'],
                boundaryGap: false,
                introduction1:'公式：月活跃用户当月每日访问次数的总和（直接获取后台数据）',
                introduction2:'定义：月活跃用户在当月访问的次数总和。',
                dataZoom: false,
                data:[
                    {
                        type: 'line',
                        name: '全部',
                        data: [14000,12320,15000,12300,15000,13070,15600,12000,16000,13000,12500,14700],
                        lineStyle: {
                            normal: {
                                color: 'rgb(145, 199, 174)'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'rgb(145, 199, 174)'
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: 'rgba(198, 225, 212, 0.67)'
                            }
                        }
                    }
                ]
            },
            {
                title: '日活跃用户人数分布',
                text: 'DAILY NEW USERS',
                x: '日期',
                y: '人',
                xAxisData:['16-12-01','16-12-02','16-12-03','16-12-04','16-12-05','16-12-06','16-12-07','16-12-08','16-12-09','16-12-10','16-12-11','16-12-12','16-12-13','16-12-14','16-12-15'],
                type: ['全部','用户','访客','全部-均线','用户-均线','访客-均线'],
                boundaryGap: false,
                introduction1:'公式：DAU',
                introduction2:'定义：日活跃用户数量,统计一日（统计日）之内，登录或使用了某个产品的用户数（去除重复登录的用户）。',
                dataZoom: true,
                data:[
                    {
                        type: 'line',
                        name: '全部',
                        data: [140,132,150,123,150,137,156,120,160,130,125,147,120,140,132]
                    },
                    {
                        type: 'line',
                        name: '用户',
                        data: [100,102,120,110,120,100,110,100,130,110,120,110,100,102,120]
                    },
                    {
                        type: 'line',
                        name: '访客',
                        data: [40,30,30,13,30,37,46,20,30,20,5,27,10,40,30]
                    },
                    {
                        type: 'line',
                        name: '全部-均线',
                        data: [130,120,134,123,140,137,136,130,140,130,125,137,122,139,140],
                        smooth: true,
                        lineStyle: {
                            normal: {
                                type: 'dashed',
                                width: 1
                            }
                        },
                        itemStyle: {
                            normal: {
                                opacity: 0
                            }
                        }
                    },
                    {
                        type: 'line',
                        name: '用户-均线',
                        data: [101,112,110,113,121,123,114,102,117,117,120,123,112,128,120],
                        smooth: true,
                        lineStyle: {
                            normal: {
                                type: 'dashed',
                                width: 1,
                                color: 'rgb(115, 130, 140)'
                            }
                        },
                        itemStyle: {
                            normal: {
                                opacity: 0
                            }
                        }
                    },
                    {
                        type: 'line',
                        name: '访客-均线',
                        data: [32,25,28,23,30,27,30,33,34,29,25,27,25,20,24],
                        smooth: true,
                        lineStyle: {
                            normal: {
                                type: 'dashed',
                                width: 1
                            }
                        },
                        itemStyle: {
                            normal: {
                                opacity: 0
                            }
                        }
                    }
                ]
            },
            {
                title: '日活跃用户访问总数',
                text: 'TOTAL DAILY USERS',
                x: '日期',
                y: '次',
                xAxisData:['16-12-01','16-12-02','16-12-03','16-12-04','16-12-05','16-12-06','16-12-07','16-12-08','16-12-09','16-12-10','16-12-11','16-12-12','16-12-13','16-12-14','16-12-15'],
                type: ['日活跃用户访问总数','总数-均值'],
                boundaryGap: '5px',
                introduction1:'公式：数据库中Session的值',
                introduction2:'定义：所有日活跃用户在当天访问的次数总和',
                dataZoom: true,
                data:[
                    {
                        type: 'bar',
                        name: '日活跃用户访问总数',
                        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        barMaxWidth:'20px',
                        itemStyle: {
                            normal: {
                                color: 'rgb(97, 160, 168)'
                            }
                        },
                        markPoint: {
                            symbol: 'image://img/circle.png',
                            symbolSize: 26,
                            label: {
                                normal: {
                                    position: 'top',
                                    formatter: ''
                                }
                            },
                            data: [ ]
                        }
                    },
                    {
                        type: 'line',
                        name: '总数-均值',
                        data: [13000,12320,13400,12300,14000,13070,13600,13000,14000,13000,12500,13700,13000,13500,14000],
                        smooth: true,
                        lineStyle: {
                            normal: {
                                type: 'dashed',
                                color: 'grey',
                                width: 1
                            }
                        },
                        itemStyle: {
                            normal: {
                                opacity: 0
                            }
                        }
                    }
                ]
            },
            {
                title: '人均日访问次数',
                x: '日期',
                y: '次',
                xAxisData:['16-12-01','16-12-02','16-12-03','16-12-04','16-12-05','16-12-06','16-12-07','16-12-08','16-12-09','16-12-10','16-12-11','16-12-12','16-12-13','16-12-14','16-12-15'],
                type: ['用户','均线'],
                boundaryGap: false,
                introduction1:'公式：日访问总次数／用户人数',
                introduction2:'定义：日活跃用户在当天的人均访问次数。',
                dataZoom: true,
                data:[
                    {
                        type: 'line',
                        name: '用户',
                        data: [10,12,12,11,12,16,10,10,11,11,12,11,10,12,10],
                        itemStyle: {
                            normal: {
                                color: 'green'
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: 'green',
                                opacity: 0.2
                            }
                        }
                    },
                    {
                        type: 'line',
                        name: '均线',
                        data: [12,11,13,13,12,10,12,12,13,12,10,11,13,12,12],
                        smooth: true,
                        lineStyle: {
                            normal: {
                                type: 'dashed',
                                width: 1,
                                color: 'grey'
                            }
                        },
                        itemStyle: {
                            normal: {
                                opacity: 0
                            }
                        }
                    }
                ]
            },
            {
                title: '人均日访问时长',
                x: '日期',
                y: '分',
                xAxisData:['16-12-01','16-12-02','16-12-03','16-12-04','16-12-05','16-12-06','16-12-07','16-12-08','16-12-09','16-12-10','16-12-11','16-12-12','16-12-13','16-12-14','16-12-15'],
                type: ['人均日访问时长','人均时长-均线'],
                boundaryGap: '5px',
                introduction1:'公式：日访问总时长／用户人数',
                introduction2:'定义：用户在当天的人均访问时长。',
                dataZoom: true,
                data:[
                    {
                        type: 'bar',
                        name: '人均日访问时长',
                        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        barMaxWidth:'20px',
                        itemStyle: {
                            normal: {
                                color: 'rgb(97, 160, 168)'
                            }
                        },
                        markPoint: {
                            symbol: 'image://img/circle.png',
                            symbolSize: 26,
                            label: {
                                normal: {
                                    position: 'top',
                                    formatter: ''
                                }
                            },
                            data: [ ]
                        }
                    },
                    {
                        type: 'line',
                        name: '人均时长-均线',
                        data: [12,11,12,13,12,10,12,12,13,12,10,11,13,12,12],
                        smooth: true,
                        lineStyle: {
                            normal: {
                                type: 'dashed',
                                width: 1,
                                color: 'grey'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'grey',
                                opacity: 0
                            }
                        }
                    }
                ]
            },
            {
                title: '粘连度(DAU/MAU)',
                text: 'DAU/MAU',
                x: '日期',
                y: 'DAU/MAU',
                xAxisData:['16-12-01','16-12-02','16-12-03','16-12-04','16-12-05','16-12-06','16-12-07','16-12-08','16-12-09','16-12-10','16-12-11','16-12-12','16-12-13','16-12-14','16-12-15'],
                type: ['用户','用户-均线'],
                boundaryGap: '5px',
                introduction1: '计算公式：当日DAU/当日所在月的MAU。',
                introduction2: '定义：每天登陆的用户占月活跃用户的百分比。',
                dataZoom: false,
                data: [
                    {
                        type: 'bar',
                        name: '用户',
                        data: [0.30,0.22,0.31,0.33,0.34,0.27,0.36,0.26,0.30,0.21,0.25,0.22,0.24,0.20,0.30],
                        //barMaxWidth: 10,
                        //smooth:true
                        barWidth:'20px',
                        itemStyle: {
                            normal: {
                                color: '#c06a5e'
                            }
                        }
                    },
                    {
                        type: 'line',
                        name: '用户-均线',
                        data: [0.33,0.31,0.29,0.30,0.34,0.31,0.28,0.30,0.32,0.24,0.27,0.25,0.24,0.30,0.24],
                        smooth: true,
                        lineStyle: {
                            normal: {
                                type: 'dashed',
                                width: 1,
                                color: 'rgb(115, 130, 140)'
                            }
                        },
                        itemStyle: {
                            normal: {
                                opacity: 0
                            }
                        }
                    }
                ] ,
            },
            {
                title: '单次访问平均时长',
                x: '日期',
                y: '分',
                xAxisData:['16-12-01','16-12-02','16-12-03','16-12-04','16-12-05','16-12-06','16-12-07','16-12-08','16-12-09','16-12-10','16-12-11','16-12-12','16-12-13','16-12-14','16-12-15'],
                type: ['单次访问时长','单次时长-均线'],
                boundaryGap: false,
                introduction1:'公式：日访问总时长／日访问总次数',
                introduction2:'定义：单次访问的平均访问时长。',
                dataZoom: true,
                data:[
                    {
                        type: 'line',
                        name: '单次访问时长',
                        data: [4,2,3,2,4,3,5,5,2,3,2,4,5,4,3],
                        barMaxWidth: 10,
                        areaStyle: {
                            normal: {
                                opacity: 0.2
                            }
                        }
                    },
                    {
                        type: 'line',
                        name: '单次时长-均线',
                        data: [4,3,4,3,5,3,4,3,3,4,4,5,4,3,4],
                        smooth: true,
                        lineStyle: {
                            normal: {
                                type: 'dashed',
                                width: 1,
                                color: 'rgb(115, 130, 140)'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'rgb(115, 130, 140)',
                                opacity: 0
                            }
                        }
                    }
                ]
            },
        ],

        tabsNum: {
            dau: [0,0,0],//第一个值是数值，第二个是百分比，第三个代表上升或降低，默认0是上升
            mau: [0,0,0],
            duration: [0,0,0]
        },





        //
        //test3数据
        //

        /****表格中数据******/
        testTableData1: {
            //被参照组
            Original : {
                PV: '54321',
                UV: '12345',
                Success: '50'
            },
            //参照组
            variation : [
                 {
                     name:'Variation1',
                     PV: '65432',
                     UV: '23456',
                     Success: '40',
                    // diff: ''
                 },
                // {
                //     name:'Variation2',
                //     PV: '12345',
                //     UV: '12345',
                //     Success: '30',
                //     diff: ''
                // }
            ],
            max: {
                name: 'Original',
                value: '50'
            }
        },

        testTableData2: {
            //被参照组
            Original : {
                平均耗时: '2.3',
                本地耗时: '0.8',
                网络耗时: '1.5'
            },
            //参照组
            variation : [
                 {
                     name:'Variation1',
                     aver: '2.5',
                     local: '0.9',
                     net: '1.6'
                 },
                // {
                //     name:'Variation2',
                //     aver: '2.0',
                //     local: '1.0',
                //     net: '1.0'
                // }
            ],
            max: {
                name: 'Variation1',
                value: '2.5'
            }
        },

        /****表格中数据******/

        /********折线图中数据(7个:第一个是成功率，第二个是速度分析的平均耗时，第三个是本地耗时，第四个是网络耗时，第五个top10，第六个)******/
        testChartData: [
            {
                x: '日期',
                y: '成功率(%)',
                title: '',
                xType: 'category',
                yType: 'value',
                type: ['Original','Variation1','Variation2'],
                nameLocation: 'end',
                nameGap: 15,
                xAxisData: ['20170206','20170207','20170208','20170209','20170210','20170211','20170212','201702013','20170214','20170215','20170216','20170217'],
                yAxisData:'',
                min:'',
                max:'',

                boundaryGap: false,
                dataZoom: false,
                color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                animation: false,
                data:[
                    {
                        type: 'line',
                        name: 'Original',
                        data: [74,89,88,79,81,88,82,87,78,83,79,85]
                    },
                    {
                        type: 'line',
                        name: 'Variation1',
                        data: [77,90,88,80,87,83,76,87,78,83,85,83]
                    },
                    {
                        type: 'line',
                        name: 'Variation2',
                        data: [79,85,81,77,84,80,85,84,79,85,81,82]
                    }
                ]
            },
            {
                x: '日期',
                y: '平均耗时（s）',
                title: '',
                type: ['Original','Variation1','Variation2'],
                nameLocation: 'end',
                nameGap: 15,
                xAxisData: ['20170206','20170207','20170208','20170209','20170210','20170211','20170212','201702013','20170214','20170215','20170216','20170217'],
                yAxisData: '',
                min:'',
                max:'',
                boundaryGap: false,
                dataZoom: false,
                color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                animation: true,
                data:[
                    {
                        type: 'line',
                        name: 'Original',
                        data: [2.8,2.5,2.8,3.0,2.6,2.1,2.0,2.4,2.9,2.7,2.9,2.3]
                    },
                    {
                        type: 'line',
                        name: 'Variation1',
                        data: [2.3,1.9,2.1,2.2,2.8,2.2,3.0,2.3,2.2,2.4,2.9,2.5]
                    },
                    {
                        type: 'line',
                        name: 'Variation2',
                        data: [2.5,1.6,1.7,1.8,1.8,1.9,2.0,3.1,2.7,2.3,2.1,2.0]
                    }
                ]
            },
            {
                x: '日期',
                y: '本地耗时（s）',
                title: '',
                xType: 'category',
                yType: 'value',
                type: ['Original','Variation1','Variation2'],
                nameLocation: 'end',
                nameGap: 15,
                xAxisData: ['20170206','20170207','20170208','20170209','20170210','20170211','20170212','201702013','20170214','20170215','20170216','20170217'],
                yAxisData: '',
                min:'',
                max:'',
                boundaryGap: false,
                dataZoom: false,
                color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                animation: true,
                data:[
                    {
                        type: 'line',
                        name: 'Original',
                        data: [65,68,73,75,71,75,79,80,74,77,71,68]
                    },
                    {
                        type: 'line',
                        name: 'Variation1',
                        data: [68,73,75,79,81,77,82,76,78,79,71,80]
                    },
                    {
                        type: 'line',
                        name: 'Variation2',
                        data: [82,87,81,79,81,83,79,87,78,80,85,88]
                    }
                ]
            },
            {
                x: '日期',
                y: '网络耗时（s）',
                title: '',
                xType: 'category',
                yType: 'value',
                type: ['Original','Variation1','Variation2'],
                nameLocation: 'end',
                nameGap: 15,
                xAxisData: ['20170206','20170207','20170208','20170209','20170210','20170211','20170212','201702013','20170214','20170215','20170216','20170217'],
                yAxisData: '',
                min:'',
                max:'',
                boundaryGap: false,
                dataZoom: false,
                color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                animation: true,
                data:[
                    {
                        type:'line',
                        name: 'Original',
                        data: [79,83,85,79,83,85,82,87,78,83,79,80]
                    },
                    {
                        type:'line',
                        name: 'Variation1',
                        data: [75,87,88,75,82,83,85,81,77,80,85,85]
                    },
                    {
                        type: 'line',
                        name: 'Variation2',
                        data: [72,80,81,79,81,83,79,87,78,80,85,88]
                    }
                ]
            },
            {
                title: '错误码分布',
                x: '百分比',
                y: '',
                yType: 'category',
                xType: 'value',
                type: ['Original','Variation1'],
                xAxisData: '',
                nameLocation: 'end',
                nameGap: 22,
                yAxisData: ['Top10','Top9','Top8','Top7','Top6','Top5','Top4','Top3','Top2','Top1'],
                boundaryGap: true,
                dataZoom: false,
                color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                animation: false,
                data:[
                    {
                        type:'bar',
                        name: 'Original',
                        data:[3, 9, 14, 16, 12, 7, 14, 13, 10, 8],
                        barMaxWidth: 5
                    },
                    {
                        type:'bar',
                        name: 'Variation1',
                        data:[5, 10 ,10 ,13 ,12 ,14 ,13 ,10 ,13 ,10],
                        barMaxWidth: 5
                    }
                ]
            },
            {
                title: '时长分布（本地耗时）',
                x: '百分比',
                y: '',
                yType: 'category',
                xType: 'value',
                type: ['Original','Variation1'],
                xAxisData: '',
                nameLocation: 'end',
                nameGap: 22,
                yAxisData: ['>5s','4-5s','3-4s','2-3s','1-2s','0-1s'],
                boundaryGap: true,
                dataZoom: false,
                color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                animation: true,
                data:[
                    {
                        type:'bar',
                        name: 'Original',
                        data:[18, 23, 29, 10, 13, 3],
                        barWidth: 5
                    },
                    {
                        type:'bar',
                        name: 'Variation1',
                        data:[19, 21, 22, 12, 11, 4],
                        barWidth: 5
                    }
                ]
            },
            {
                title: '时长分布（网络耗时）',
                x: '百分比',
                y: '',
                yType: 'category',
                xType: 'value',
                type: ['Original','Variation1'],
                xAxisData: '',
                nameLocation: 'end',
                nameGap: 22,
                yAxisData: ['>5s','4-5s','3-4s','2-3s','1-2s','0-1s'],
                boundaryGap: true,
                dataZoom: false,
                color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                animation: true,
                data:[
                    {
                        type:'bar',
                        name: 'Original',
                        data: [74,89,88,79,81,88],
                        barWidth: 5
                    },
                    {
                        type:'bar',
                        name: 'Variation1',
                        data: [77,89,88,79,81,83],
                        barWidth: 5
                    }
                ]
            },
        ],
        /********折线图中数据******/


        timechoose1 : 1,  //控制图表中含有选择器的图表显示的内容 ，默认平均耗时1，本地耗时2，网络耗时3
        timechoose2 : 5,  //默认本地耗时5，网络耗时6



        PortData: {
            business_name: 'refresh_feed', //业务名
            platform: 'iPhone', //平台 eg：‘Iphone’
            edition: 'all', //版本
            time: '20170301-20170305', //时间范围 eg：20170203-20130216
            granularity: 'd' //颗粒度 eg：一周
        },
        //平台对应业务数据
        setting:{
            iphone:{
                load_articl:"文章加载",
                send_blog:"发微博",
                upload_file:"文件上传",
                refresh_feed:"feed刷新",
                refresh_pagelist:"pagelist刷新",
                preload_article:"文章预加载",
                app_launch:"微博启动速度",
                weibo_netcore:"搜索广告",
                new_app_launch:'新启动时间',
            },
            android:{
                load_articl:"文章加载",
                send_blog:"发微博",
                upload_file:"文件上传",
                refresh_feed:"feed刷新",
                refresh_pagelist:"pagelist刷新",
                preload_article:"文章预加载",
                app_launch:"微博启动速度",
                weibo_netcore:"搜索广告",
                new_app_launch:'新启动时间',

            }
        },
        //平台对应版本数据
        version:{
            iphone:["All","710","720"],
            android:["All","730"]
        },


        chart: {
            queryParam: '',
            ready: false,
            income: {
                ready: false,
                data: []
            },
            offline: {
                ready: false,
                data: [],
                total: 100
            },
            family: {
                ready: false,
                data: []
            },
            province: {
                ready: false,
                data: []
            },
            nation: {
                ready: false,
                data: [],
                total: 100
            },
            happy: {
                ready: false,
                data: [],
                total: 1
            },
            basic: {
                ready: false,
                data: []
            },

            /*
             * FOLLOW OBJECT IS ADDED BY CONG
             * */
            preinfo: {
                ready: false,
                data: []
            },
        },

        /*
         * 用户管理相关
         * */
        admin: {
            ready: false,
            users: []
        }
    },


    // Emit Change event
    emitChange: function (value) {
        this.emit('change')
        console.log("触发事件"+value)
    },

    // Add change listener
    addChangeListener: function (callback) {
        this.on('change', callback)
    },

    // Remove change listener
    removeChangeListener: function (callback) {
        this.removeListener('change', callback)
    }
})
module.exports = AppStore;



