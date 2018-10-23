import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, Image, FlatList, Picker } from 'react-native';
import { MapView, Location, Permissions } from 'expo';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {rates:[], location: {coords : {latitude : 0, longitude: 0}}, address:'', region: {
      latitude:60.200692,
      longitude:24.934302,
      latitudeDelta:0.0322,
      longitudeDelta:0.0221,
    }, result:''};
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation = async () => {
    let {status} = await Permissions.askAsync(Permissions.LOCATION)
    let location;
    if (status !== 'granted') {
      Alert.alert("No permission to acces location");
    } else {
      location = await Location.getCurrentPositionAsync({});
      console.log({location});
      this.setState({ location});
      this.setState({region: {
        latitude:this.state.location.coords.latitude,
        longitude:this.state.location.coords.longitude,
        latitudeDelta:0.0322,
        longitudeDelta:0.0221,
      }},);
    }

  }
  // Jeremy -> google place API : AIzaSyANGZYjfaUs1PuIxpD2AHIh_9bFBANui_M

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
            latitude:this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude
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
