import React from 'react';
import { View, Text, Switch, StyleSheet, Button } from 'react-native';
import DogHeader from '../../generalComponents/Header/DogHeader.component';
import {DAILY,MONTHLY,WEEKLY,DAILY_LABELS,
  WEEKLY_LABELS,YEARLY_LABELS,backgroundColor,headerHeight,YEARLY} from '../../common/constants'
import {
  LineChart,
  BarChart,
} from "react-native-chart-kit";

export default class Statistics extends React.Component {
  constructor(props){
    super(props);
    this.state={
      data:[1,2,3,4,5],
      startIndex:0,
      chart: "lineChart",
    }
    this.dataType=DAILY;
    this.labels;
    this.components={lineChart: LineChart, barChart:BarChart}

    this.getDataFromServer=this.getDataFromServer.bind(this);
    this.nextPrevClicked=this.nextPrevClicked.bind(this);
    this.getRealLabels=this.getRealLabels.bind(this);
 }

  componentDidMount(){
    this.getDataFromServer(DAILY);
  }
  

  getDataFromServer(dataWidth){
    let data=[];
    this.dataType=dataWidth;
    switch(dataWidth){
      case DAILY:
        data=[Math.random() * 100, Math.random()* 100, Math.random()* 100];
        break;
      case WEEKLY:
        for(let i=0;i<7;i++){
          data[i]=Math.random() * 100;
        }
        break;
      case MONTHLY:
        for(let i=0;i<31;i++){
          data[i]=Math.random() * 100;
        }
        break;
      case YEARLY:
        for(let i=0;i<12;i++){
          data[i]=Math.random() * 100;
        }
        break;
    }    
    this.labels=Array.from(Array(7).keys()).map(v=>v+1); //gets array of [1,2,3...,n]    
    this.setState({data:data, startIndex:0}); //we get only first seven data to show
  }

  nextPrevClicked(direction){
    let newIndex;
    let diff=0;
    if(direction==="next"){
      newIndex=this.state.startIndex+7;
      if(newIndex+8>this.state.data.length){
        diff=this.state.data.length-newIndex;
        if(newIndex>=this.state.data.length){
          newIndex=newIndex-7;
          diff=this.state.data.length-newIndex;
        }
      }
    }
    else{
      newIndex=this.state.startIndex-7;
      if(newIndex<0){
        newIndex=0;
      }
    }
    this.labels=Array.from(Array(diff || 7).keys()).map(v=>v+newIndex+1);
    this.setState({startIndex:newIndex});
  }
  getRealLabels(){
    let realLabels=[];
    if(this.labels){
      switch(this.dataType){
        case DAILY:
          for(let i=0; i<3;i++){
            realLabels.push(DAILY_LABELS[i]);
          }
          break;
        case WEEKLY:
          realLabels=this.labels.map(v=>{
            return WEEKLY_LABELS[v-1]
          })
          break;
        case YEARLY:
          realLabels=this.labels.map(v=>{
            return YEARLY_LABELS[v-1]
          })
          break;    
      }
    }
    return realLabels.length>0?realLabels:this.labels;
  }

  toggleSwitch = () => {
    if(this.state.chart==="lineChart"){
      this.setState({ chart: "barChart" });
    }
    else{
      this.setState({ chart: "lineChart" });
    }
  };


  render() {
    const realLabels=this.getRealLabels();
    let prevDisabled, nextDisabled;
    if(this.state.startIndex==0){
      prevDisabled=true;
    }
    if(this.state.data.length-7<=this.state.startIndex){
      nextDisabled=true;
    }
    const Comp=this.components[this.state.chart];
    return (
      <View style={style.container}>
        <DogHeader {...this.props} />
        <View style={style.chart}>
          <Comp
            data={{
              labels: realLabels,
              datasets: [
                {data:(this.state.data.slice(this.state.startIndex,this.state.startIndex+7))}
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
        <View style={style.prevNext}>
          <Button title="Prev" onPress={()=>this.nextPrevClicked("prev")} disabled={prevDisabled}/>
          <Button title="Next" onPress={()=>this.nextPrevClicked("next")} disabled={nextDisabled}/>
        </View>
          <View style={style.buttonsBar}>
            <Button title="Daily" onPress={()=>this.getDataFromServer("daily")}/>
            <Button title="Weekly" onPress={()=>this.getDataFromServer("weekly")}/>
            <Button title="Monthly" onPress={()=>this.getDataFromServer("monthly")}/>
            <Button title="Yearly" onPress={()=>this.getDataFromServer("yearly")}/>
        </View>
        <View style={style.switch}>
          <Text style={style.chartText}>Switch Chart</Text>
          <Switch
            trackColor={{ false: 'green', true: 'blue' }}
            thumbColor={'white'}
            ios_backgroundColor='#3e3e3e'
            onValueChange={this.toggleSwitch}
            value={this.state.chart==="lineChart"}
          />
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
    margin: 4,
    marginTop:30
  },
  chart:{
    position: 'relative',
    marginTop: 120
  },
  prevNext:{
    flexDirection:'row',
    justifyContent:"space-between",
    margin:10
  },
  switch:{
    width:'100%',
    alignItems: "center",
    marginTop:20
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

