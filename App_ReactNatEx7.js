import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, Image, FlatList } from 'react-native';



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {recipes:[], ingredient:''};
  }

  getRecipes = () => {
    const url = 'http://www.recipepuppy.com/api/?i='+ this.state.ingredient;
    fetch(url).then((response) =>  response.json()).then((responseJson) =>  {
      this.setState({recipes: responseJson.results});
    }).catch((error) => {
      Alert.alert(error);
    });
  }

  listSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: "80%",
            backgroundColor: "#CED0CE",
            marginLeft: "10%"
          }}
        />
      );
    };

  render() {
    return (
      <View style={styles.container}>
      <FlatList
        style={{marginLeft: "5%"}}
        keyExtractor={item=> item.title}
        renderItem={({item}) => (
          <View>
            <Text>{item.title}</Text>
            <Image
              style={{width: 50, height: 50}}
              source={{uri: item.thumbnail }}
        /> </View> ) }
        data={this.state.recipes}
        ItemSeparatorComponent={this.listSeparator}
      />
        <Text>Ingredient: </Text> <TextInput style={{fontSize:18,   width:200  }} value={this.state.ingredient} onChangeText={(ingredient) => this.setState({ingredient})}/>
        <Button title="Find" onPress={this.getRecipes} />
        <Text> </Text>

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
