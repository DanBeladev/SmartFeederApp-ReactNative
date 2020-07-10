import React, { Component } from 'react';
import RowInForm from './RowInForm';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldsToValue: {},
      errorMessage: '',
    };
    this.buildForm = this.buildForm.bind(this);
    this.handleChangingValue = this.handleChangingValue.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.row = this.buildForm();
  }
  buildForm() {
    return this.props.fields.map((v) => (
      <RowInForm
        params={v}
        key={v.title}
        title={v.title}
        onGettingValue={this.handleChangingValue}
      ></RowInForm>
    ));
  }

  handleChangingValue(newVale, field) {
    let newFieldsToValue = { ...this.state.fieldsToValue };
    newFieldsToValue[field] = newVale;
    this.setState({ fieldsToValue: newFieldsToValue });
  }
  checkValidation() {
    let result = true;
    this.props.fields.forEach((v) => {
      if (v.valueType === 'Integer') {
        if (isNaN(this.state.fieldsToValue[v.field])) {
          this.setState({ errorMessage: `"${v.title}" should be a number` });
          result = false;
        }
      }
      console.log(this.state.fieldsToValue[v.field]);
      if (v.isMandetory && !this.state.fieldsToValue[v.field]) {
        this.setState({ errorMessage: `"${v.title}" has to be filled` });
        result = false;
      }
    });
    return result;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.buildForm()}
        <Text style={{ color: 'red', width: '100%', textAlign: 'center' }}>
          {this.state.errorMessage}
        </Text>
        <View style={styles.divider}></View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.but}
            on
            onPress={() => {
              if (this.checkValidation()) {
                this.props.callBack(this.state.fieldsToValue);
              }
            }}
          >
            <Text style={styles.textBtn}>Add Dog</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={this.props.closeForm}
          >
            <Text style={styles.textBtn}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    borderRadius: 30,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'flex-start',
  },
  actionButtons: {
    // flex: 1,
    width: '70%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  but: {
    alignSelf: 'center',
    width: '70%',
    justifyContent: 'center',
    textAlign: 'center',
    height: 40,
    backgroundColor: 'green',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'black',
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: 'black',
    borderColor: 'black',
  },
  cancelBtn: {
    marginHorizontal: 25,
    alignSelf: 'center',
    width: '50%',
    justifyContent: 'center',
    textAlign: 'center',
    height: 40,
    backgroundColor: 'red',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'black',
  },
  textBtn: {
    fontSize: 23,
  },
});
