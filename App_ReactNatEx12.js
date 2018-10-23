import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, Image, FlatList, Picker } from 'react-native';
import { MapView, Location, Permissions, SQLite} from 'expo';

const db  = SQLite.openDatabase('coursedb.db');

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state= {amount:'' , product:'', shoplist:[] };


  }

  componentDidMount() {
    db.transaction(tx => {
      tx .executeSql('create table if not  exists shoplist(id integer primary key not null, product text, amount text);');
    });
    this.updateList();
  }

  updateList = () => {
    db.transaction(tx => {
      tx .executeSql('select * from shoplist', [], (_, { rows}) =>
        this.setState({shoplist:rows._array})
      );
    });
  }

  saveItem = () => {
    db.transaction(tx => {
      tx .executeSql('insert into shoplist(product, amount) values(?, ?)',
        [this.state.product, this.state.amount]);
    }, null, this.updateList)
  }

  // Delete course
  deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from shoplist where id = ?;`, [id]);
      }, null, this.updateList
    )
  }

  listSeparator = () => {
  return (
    <View
      style={{
        height: 5,
        width: "80%",
        backgroundColor: "#fff",
        marginLeft: "10%"
      }}
    />
  );
};


render() {
  return (
    <View style={styles.container}>
      <TextInput placeholder='Product' style={{marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(product) => this.setState({product})}
        value={this.state.title}/>
      <TextInput placeholder='Amount' style={{ marginTop: 5, marginBottom: 5,  fontSize:18, width: 200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(amount) => this.setState({amount})}
        value={this.state.credit}/>
      <Button onPress={this.saveItem} title="Save" />
      <Text style={{marginTop: 30, fontSize: 20}}>Shopping list</Text>
      <FlatList
        style={{marginLeft : "5%"}}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) =>
          <View style={styles.listcontainer}>
            <Text style={{fontSize: 18}}> {item.product}, {item.amount} </Text>
            <Text style={{fontSize: 18, color: '#0000ff'}} onPress={() => this.deleteItem(item.id)}>bought</Text>
          </View>
        } data={this.state.shoplist} ItemSeparatorComponent={this.listSeparator} />
    </View>
  );
}

}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center'
},
listcontainer: {
  flexDirection: 'row',
  backgroundColor: '#fff',
  alignItems: 'center'
}
});
