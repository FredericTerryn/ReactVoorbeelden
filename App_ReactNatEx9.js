import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, Image, FlatList, Picker } from 'react-native';
import { MapView } from 'expo';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {rates:[], address:'', region: {
      latitude:60.200692,
      longitude:24.934302,
      latitudeDelta:0.0322,
      longitudeDelta:0.0221,
    }, result:''};
  }

  showMaps = () => {
    const url = 'https://api.mapfit.com/v2/geocode?street_address=' +this.state.address+ '&api_key=591dccc4e499ca0001a4c6a4811f5c99db1844bea564e995e836b3d1';
    console.log(url);
    fetch(url).then((response) =>  response.json()).then((responseJson) =>  {
      if (responseJson[0].response_type !== 3) {
        let region = {...this.state.region};
        region.latitude = responseJson[0].location.lat;
        region.longitude= responseJson[0].location.lon;
        this.setState({region: region});
      } else {Alert.alert("Address don't find ...")}
    }).catch((error) => {
      Alert.alert(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex:1 }}
          region={this.state.region}>
          <MapView.Marker
          coordinate={{
            latitude:60.201373,
            longitude: 24.934041
          }} title='Haaga-Helia'/>
        </MapView>
        <TextInput style={styles.inputR} value={this.state.address} onChangeText={(address) => this.setState({address})}/>
        <Button title="Show" onPress={this.showMaps}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowContainer:{
    flexDirection:'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
