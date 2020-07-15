import React from 'react';
import { View, Switch, Text, StyleSheet, Button } from 'react-native';
import DogHeader from '../../generalComponents/Header/DogHeader.component';
import {
  backgroundColor,
  headerHeight,
  DAYLY,
  MONTHLY,
  WEEKLY,
  YEARLY,
} from '../../common/constants';
import { LineChart, BarChart } from 'react-native-chart-kit';

export default class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1, 2, 3, 4, 5],
      startIndex: 0,
      ShowLineChart: true,
    };

    this.isDaily = true;
    this.labels;
    this.getDataFromServer = this.getDataFromServer.bind(this);
    this.nextPrevClicked = this.nextPrevClicked.bind(this);
  }

  componentDidMount() {
    this.getDataFromServer(MONTHLY);
  }

  getDataFromServer(dataWidth) {
    let data = [];
    let labels = [];
    switch (dataWidth) {
      case DAYLY:
        data = [Math.random() * 100, Math.random() * 100, Math.random() * 100];
        labels = ['breakfast', 'lunch', 'dinner'];
        console.log(data);
        break;
      case WEEKLY:
        for (let i = 0; i < 7; i++) {
          data[i] = Math.random() * 100;
        }
        labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
        break;
      case MONTHLY:
        for (let i = 0; i < 31; i++) {
          data[i] = Math.random() * 100;
        }
        console.log(data);
        labels = Array.from(Array(7).keys()).map((v) => v + 1); //gets array of [1,2,3...,n]
        break;
      case YEARLY:
        for (let i = 0; i < 12; i++) {
          data[i] = Math.random() * 100;
        }
        labels = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];
        break;
    }
    this.labels = labels;
    this.setState({ data: data, startIndex: 0 }); //we get only first seven data to show
  }

  nextPrevClicked(direction) {
    let newIndex;
    let diff = 0;
    if (direction === 'next') {
      newIndex = this.state.startIndex + 7;
      //checking if index is out of range
      if (newIndex + 8 > this.state.data.length) {
        diff = this.state.data.length - newIndex;
        if (newIndex >= this.state.data.length) {
          newIndex = newIndex - 7;
          diff = this.state.data.length - newIndex;
        }
      }
    } else {
      //prev clicked
      newIndex = this.state.startIndex - 7;
      if (newIndex < 0) {
        newIndex = 0;
      }
    }
    this.labels = Array.from(Array(diff || 7).keys()).map(
      (v) => v + newIndex + 1
    );
    this.setState({ startIndex: newIndex });
  }

  toggleSwitch = () => {
    this.setState({ ShowLineChart: !this.state.ShowLineChart });
  };

  render() {
    return (
      <View style={style.container}>
        <DogHeader {...this.props} />
        <View style={style.switch}>
          <Text style={style.chartText}>Switch Chart</Text>
        <Switch
            trackColor={{ false: 'green', true: 'blue' }}
            thumbColor={'white'}
            ios_backgroundColor='#3e3e3e'
            onValueChange={this.toggleSwitch}
            value={this.state.ShowLineChart}
          />
          </View>
        <View style={style.chart}>
          {this.state.ShowLineChart ? (
            <LineChart
              data={{
                labels: this.labels,
                datasets: [
                  {
                    data: this.state.data.slice(
                      this.state.startIndex,
                      this.state.startIndex + 7
                    ),
                  },
                ],
              }}
              width={360} // from react-native
              height={220}
              yAxisSuffix='gr'
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 5,
                marginHorizontal: 20,
                borderRadius: 4,
              }}
            />
          ) : (
            <BarChart
              data={{
                labels: this.labels,
                datasets: [
                  {
                    data: this.state.data.slice(
                      this.state.startIndex,
                      this.state.startIndex + 7
                    ),
                  },
                ],
              }}
              width={360} // from react-native
              height={220}
              yAxisSuffix='gr'
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 0,
                marginHorizontal: 20,
                borderRadius: 4,
              }}
            />
          )}
        </View>
        <View style={style.prevNext}>
          <Button title='Prev' onPress={() => this.nextPrevClicked('prev')} />
          <Button title='Next' onPress={() => this.nextPrevClicked('next')} />
        </View>
        <View style={style.buttonsBar}>
          <Button title={DAYLY} onPress={() => this.getDataFromServer(DAYLY)} />
          <Button
            title={WEEKLY}
            onPress={() => this.getDataFromServer(WEEKLY)}
          />
          <Button
            title={MONTHLY}
            onPress={() => this.getDataFromServer({ MONTHLY })}
          />
          <Button
            title={YEARLY}
            onPress={() => this.getDataFromServer(YEARLY)}
          />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: backgroundColor,
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    top: headerHeight,
  },
  buttonsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 4,
    marginTop: 30,
  },
  chart: {
    position: 'relative',
    marginTop: 120,
  },
  chartText:{
    fontWeight:'bold'
  },
  prevNext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  switch:{
    width:'100%',
    alignItems: "center",
  }
});

const chartConfig = {
  backgroundColor: backgroundColor,
  backgroundGradientFrom: backgroundColor,
  backgroundGradientTo: backgroundColor,
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};
