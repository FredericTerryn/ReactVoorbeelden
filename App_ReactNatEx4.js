import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, Image, FlatList } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {item:'', data:[]}
  }

  btnAddPressed = () => {
    this.setState({data: [...this.state.data, {key: this.state.item}] });
  }
  btnClearPressed = () => {
    this.setState({data: [] });
  }

  render() {
//<Image style={{width:250, height: 100}   } source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShif1Ky3WU4ZAB-Tq6EfdKlg76HVli4we054r0DXgFQmqhsjpMKw'}}/>
    return (
      <View style={styles.container}>
        <Text/><Text/>
        <TextInput style = {{width:200  , borderColor: 'gray',   borderWidth:1}}
          onChangeText={(text) => this.setState({item: text})}
          value={this.state.item}/>
        <View style={styles.btnContainer}>
          <Button title="ADD" onPress={this.btnAddPressed} />
          <Button title="CLEAR" onPress={this.btnClearPressed} />
        </View>

        <Text>Shopping List</Text>
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
