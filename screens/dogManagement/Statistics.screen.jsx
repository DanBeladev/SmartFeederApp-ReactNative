import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import DogHeader from '../../generalComponents/Header/DogHeader.component';
import { backgroundColor, headerHeight } from '../../common/constants';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

export default class Statistics extends React.Component {
 constructor(props){
   super(props);
   this.state={
    data:[1,2,3,4,5],
    shownData:[1,2,3,4,5]
  }
  this.isDaily=true;
  this.labels;
  this.getDataFromServer=this.getDataFromServer.bind(this);
 }

componentDidMount(){
  this.getDataFromServer("weekly");
}
  

  getDataFromServer(dataWidth){
    let data=[];
    let labels=[];
    switch(dataWidth){
      case "daily":
        data=[Math.random() * 100, Math.random()* 100, Math.random()* 100];
        console.log(data);
        break;
      case "weekly":
        for(let i=0;i<7;i++){
          data[i]=Math.random() * 100;
        }
        break;
      case "monthly":
        for(let i=0;i<31;i++){
          data[i]=Math.random() * 100;
        }
        break;
      case "yearly":
        for(let i=0;i<12;i++){
          data[i]=Math.random() * 100;
        }
        break;
    }
    if(dataWidth==="daily"){
      labels=["breakfast","lunch", "dinner"];
    }
    else{
      labels=Array.from(Array(data.length).keys()).map(v=>v+1); //gets array of [1,2,3...,n]
    }
    console.log(labels);
    console.log(data);
    this.labels=labels;
    this.setState({data:data,shownData:data.slice(0,7)}); //we get only first seven data to show
  }



  render() {
    return (
      <View style={style.container}>
        <DogHeader {...this.props} />
        <View style={style.chart}>
          <LineChart
            data={{
              labels: this.labels,
              datasets: [
                {data:(this.state.shownData)}
              ]
            }}
            width={360} // from react-native
            height={220}
            yAxisSuffix="gr"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={chartConfig}
            bezier
            style={{
              marginVertical: 4,
              borderRadius: 4
            }}
          />
        </View>
          <View style={style.buttonsBar}>
            <Button title="Daily" />
            <Button title="Weekly" />
            <Button title="Monthly" />
            <Button title="Yearly" />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flexDirection:'column',
    backgroundColor: backgroundColor,
    flex:1
  },
  content: {
    top: headerHeight,
  },
  buttonsBar:{
    flexDirection:'row',
    justifyContent:"space-between",
    margin: 4
  },
  chart:{
    position: 'relative',
    marginTop: 120
  }
});

const chartConfig={
  backgroundColor: backgroundColor,
  backgroundGradientFrom: backgroundColor,
  backgroundGradientTo: backgroundColor,
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726"
  }
}
