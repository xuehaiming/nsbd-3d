import $ from 'jquery';
export default function(data,attr){
    let color = ['#2f9cff','#f04134', '#61a0a8', '#d48265', '#91c7ae','#FF6666',  '#ca8622', '#bda29a','#CCFF99', '#FF9900', '#9933FF','#99CC66','#FFFF00']
    let legendArr = data.map((item)=>{
        return item.name;
    });//["陶岔", "姜沟", "刘湾", "府城南", "漳河北", "南大郭", "田庄", "西黑山", "中易水", "坟庄河", "惠南庄", "天津外环河"]
    console.log("lineoption----");
    let key = attr.key;
    let label = attr.label;
    let seriesArr = [];
    data.forEach((item,idx)=>{
        let obj = new Object();
        obj.name = item.name;
        obj.type = 'line';
        obj.smooth = true;
        obj.data = item[key].length>100?item[key].slice(0,10):item[key];
        obj.itemStyle = {
            normal: {
                lineStyle: {
                  width: 2
                }
            }
        };
        seriesArr.push(obj);
    })
    let timeArr = JSON.parse(JSON.stringify(data[0].time));
    timeArr = timeArr.length>100?timeArr.slice(0,10):timeArr;
    
    //  let datas =Object.values(data)[0];
    //  let newArry = Object.values(datas[seriesName])[0].map((v,i)=>{
    //      return  (v*100).toFixed(3);
    //  });
     
    //  let series=[],
    //      legend = [];
    
    return  {
        color,
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            top: 60,
            show: false,
            height: 100
        },
        legend: {
            type: 'scroll',
            height: 30,
            data: legendArr,
            scrollDataIndex: 5,
            selected: {
                '陶岔': true,
                '姜沟': false,
                '刘湾': false,
                '府城南': false,
                '漳河北': false,
                '南大郭': false,
                '田庄': false,
                '西黑山': false,
                '中易水': false,
                '坟庄河': false,
                '惠南庄': false,
                '天津外环河': false
            }
        },
        xAxis:  {
            name:'t',
            // nameRotate: 90,
            type: 'category',
            // boundaryGap: false,
            splitNumber: 5,
            data: timeArr,
            axisLabel:{
                // interval: 2,
                // rotate: -90,
                // height: 30
                formatter: (v,i)=>{
                    let text = v.substring(0,10);
                    return text;
                }
            }
        },
        yAxis: {
            name: label,
            type: 'value',
            axisLabel: {
                // formatter: '{value} °C'
                formatter: '{value}'
            },
            min: 'dataMin',
            splitLine:{
                show: false
            }
        },
        series: seriesArr
    };
    
}