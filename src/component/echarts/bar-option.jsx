export default function(data){
    let color = ['#2f9cff','#6666CC','#f04134', '#61a0a8', '#d48265', '#91c7ae','#FF6666',  '#ca8622', '#bda29a','#CCFF99', '#FF9900', '#9933FF','#99CC66','#FFFF00']
    let legendArr = data.map((item)=>{
        return item.name;
    });//["陶岔", "姜沟", "刘湾", "府城南", "漳河北", "南大郭", "田庄", "西黑山", "中易水", "坟庄河", "惠南庄", "天津外环河"]
    let title = data[0].time[0];
    let cData = [];
    data.forEach((item,idx)=>{
        let cvalue = item.ph[0];
        cData.push(cvalue);
    })
    let timeArr = JSON.parse(JSON.stringify(data[0].time));
    timeArr = timeArr.length>100?timeArr.slice(0,10):timeArr;
    
    return {
        color,
        title: {
            text: title,
            textStyle:{
                color: '#6666CC',
                fontSize: 16,
                fontWeight: 'lighter'
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            top: 34,
            show: false,
            height: 102
        },
        xAxis: {
            type: 'category',
            data: legendArr,
            axisLabel:{
                rotate: -50,
                fontSize: 11,
            },
            axisLine:{
                lineStyle:{
                    color: '#000'
                }
            }
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: cData,
            type: 'bar',
            barWidth: 10
        }]
    };
    
}