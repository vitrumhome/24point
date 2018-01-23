import React, { Component }  from 'react';
import { StyleSheet,  View ,TextInput,Alert,} from 'react-native';
import {Text, Button ,FormLabel, FormInput} from 'react-native-elements'

const onButtonPress = () => {
  Alert.alert('Button has been pressed!');
};


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num1: 0,
      num2: 0,
      num3: 0,
      num4: 0
    };
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text h1>24 Points</Text>
        <Button
          onPress={onButtonPress}
          backgroundColor='#ab3333'
          large
          icon={{name: 'envira', type: 'font-awesome'}}
          title='开始计算' />
        <FormLabel>数字1</FormLabel>
        <FormInput keyboardType='numeric' maxLength={2} onChangeText={(num) => this.setState({num1:num.replace(/[^0-9]/g, '')})}/>
        <FormLabel>数字2</FormLabel>
        <FormInput keyboardType='numeric' maxLength={2} onChangeText={(num) => this.setState({num2:num.replace(/[^0-9]/g, '')})}/>
        <FormLabel>数字3</FormLabel>
        <FormInput keyboardType='numeric' maxLength={2} onChangeText={(num) => this.setState({num3:num.replace(/[^0-9]/g, '')})}/>
        <FormLabel>数字4</FormLabel>
        <FormInput keyboardType='numeric' maxLength={2} onChangeText={(num) => this.setState({num4:num.replace(/[^0-9]/g, '')})}/>
        <Text style={{padding: 10, fontSize: 42}}>
          {this.state.num1 + ',' + this.state.num2 + ',' + this.state.num3 + ',' + this.state.num4 + '.'}
        </Text>
        <Text h1>24 Points</Text>
        <Text h1>24 Points</Text>
        <Text h1>24 Points</Text>
        <Text h1>24 Points</Text>

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
