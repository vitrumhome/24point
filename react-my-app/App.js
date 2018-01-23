import React, { Component }  from 'react';
import { StyleSheet, Text, View ,TextInput,Alert,} from 'react-native';
import { Button } from 'react-native-elements'

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
        <TextInput
          style={{height: 40}}
          placeholder="数字1"
          onChangeText={(num1) => this.setState({num1})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="数字2"
          onChangeText={(num2) => this.setState({num2})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="数字3"
          onChangeText={(num3) => this.setState({num3})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="数字4"
          onChangeText={(num4) => this.setState({num4})}
        />
        <Text style={{padding: 10, fontSize: 42}}>
          {this.state.num1 + ',' + this.state.num2 + ',' + this.state.num3 + ',' + this.state.num4 + '.'}
        </Text>
        <Button
            onPress={onButtonPress}
            title="Ok!"
            color="#841584"
            accessibilityLabel="Ok, Great!"
        />
        <Button
          onPress={onButtonPress}
          large
          icon={{name: 'envira', type: 'font-awesome'}}
          title='Ok!' />
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
