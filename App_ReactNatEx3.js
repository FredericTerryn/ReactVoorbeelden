import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, Image, FlatList } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {num1:'', num2:'', result:'', data:[]}
  }

  btnPlusPressed = () => {
    const r = parseInt(this.state.num1) + parseInt(this.state.num2);
    const calc = this.state.num1 + ' + ' + this.state.num2;
    this.setState({result: r, data: [...this.state.data, {key:calc}] });
  }
  btnMinusPressed = () => {
    const r = parseInt(this.state.num1) - parseInt(this.state.num2);
    const calc = this.state.num1 + ' - ' + this.state.num2;
    this.setState({result: r, data: [...this.state.data, {key:calc}] });
  }

  render() {
//<Image style={{width:250, height: 100}   } source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShif1Ky3WU4ZAB-Tq6EfdKlg76HVli4we054r0DXgFQmqhsjpMKw'}}/>
    return (
      <View style={styles.container}>
        <Text/><Text/> 
        <Text>Result: {this.state.result}</Text>
        <TextInput style = {{width:200  , borderColor: 'gray',   borderWidth:1}}
          onChangeText={(text) => this.setState({num1: text})}
          value={this.state.num1}/>
        <TextInput style = {{width:200  , borderColor: 'gray',   borderWidth:1}}
          onChangeText={(text) => this.setState({num2: text})}
          value={this.state.num2}/>
        <View style={styles.btnContainer}>
          <Button title="+" onPress={this.btnPlusPressed} value='+'/>
          <Button title="-" onPress={this.btnMinusPressed} value='-'/>
        </View>

        <Text>History</Text>
        <FlatList data={this.state.data} renderItem={({item}) =><Text>{item.key}</ Text>}/>

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
  btnContainer:{
    flexDirection:'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
