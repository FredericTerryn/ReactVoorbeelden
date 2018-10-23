import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, Image, FlatList, Picker } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {rates:[], amount:'', result:'', language: ''};
    this.getRates();
  }

  getRates = () => {
    const url = 'http://data.fixer.io/api/latest?access_key=f226462595b504132eb60332721fe62a';
    fetch(url).then((response) =>  response.json()).then((responseJson) =>  {
      this.setState({rates: responseJson.rates});
    }).catch((error) => {
      Alert.alert(error);
    });
  }
  computeRates = () => {
    console.log(this.state.rates[this.state.language]);
    let convertA = this.state.amount / this.state.rates[this.state.language] ;
    convertA += " Euro";
    this.setState({result: convertA})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.inputR}>Result: {this.state.result}</Text>
        <Text/> <Text/>
        <View style={styles.rowContainer}>
          <Text>Amount: </Text>
          <TextInput style={styles.input} value={this.state.amount} onChangeText={(amount) => this.setState({amount})}/>

        </ View>
        <Button buttonStyle={{
          backgroundColor: "rgba(92, 99,216, 1)",
          width: 300,
          height: 45,
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 5
        }} title="Convert" onPress={this.computeRates} />
        <Picker
          selectedValue={this.state.language}
          style={{ backgroundColor: '#f2f2f2', position: 'absolute', bottom: 0, left: 0, right: 0}}
          onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
          {Object.keys(this.state.rates).map(lang => <Picker.Item key={lang} label={lang} value={lang} />) }
        </Picker>
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
  rowContainer:{
    flexDirection:'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn:{
    color:"#841584",
    backgroundColor: "rgba(92, 99,216, 1)",
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    fontSize:24,
    width:200,
    height: 50,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    backgroundColor: '#f2f2f2'
  },
  inputR:{
    fontSize:24,
    height: 50,
    width:'100%',
    top: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    backgroundColor: '#f2f2f2'
  },
});
