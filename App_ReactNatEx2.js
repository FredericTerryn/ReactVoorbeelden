import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, Image } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {toGuess: Math.floor(Math.random() * 100) + 1, theGuess:'', text:'Guess a number between 1-100', nbTry : 1}
  }


  btnPressed = () => {
    const r = parseInt(this.state.theGuess) == parseInt(this.state.toGuess);
    if (r) {
      Alert.alert('You guessed the number in '+ this.state.nbTry + ' guesses');
      this.setState({toGuess: Math.floor(Math.random() * 100) + 1});
    } else {
      if (parseInt(this.state.theGuess) < parseInt(this.state.toGuess)) {
        this.setState({text: 'Your guess ' + this.state.theGuess + ' is too low'});
      } else {
        this.setState({text: 'Your guess ' + this.state.theGuess + ' is too high'});
      }
      this.setState({nbTry: this.state.nbTry + 1});
    }

  }



  render() {
//<Image style={{width:250, height: 100}   } source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShif1Ky3WU4ZAB-Tq6EfdKlg76HVli4we054r0DXgFQmqhsjpMKw'}}/>
    return (
      <View style={styles.container}>
        <View style={styles.items}>
          <Text>{this.state.text}</Text>
          <TextInput style = {{width:200  , borderColor: 'gray',   borderWidth:1}}
            onChangeText={(text) => this.setState({theGuess: text})}
            value={this.state.theGuess}/>
          <Button title="MAKE GUESS" onPress={this.btnPressed}/>
        </View>
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
  items:{
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
