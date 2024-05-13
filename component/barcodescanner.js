import React, {Component} from 'react';
import {Text, View, StyleSheet, Alert, Button, Dimensions} from 'react-native';
import {RNCamera} from 'react-native-camera';
export default class BarcodeScan extends Component {
  constructor(props) {
    super(props);
    this.handleTourch = this.handleTourch.bind(this);
    this.state = {
      torchOn: false,
      height: Dimensions.get('window').height,
      barCodeValue: '',
      saveStatus: '',
    };
  }
  onBarCodeRead = e => {
    Alert.alert('Barcode value is' + e.data, 'Barcode type is' + e.type);
    this.setState({barCodeValue: e.data});
  };
  render() {
    console.log('barcode value', this.state.barCodeValue);
    return (
      <View>
        <View style={styles.container}>
          <RNCamera
            style={{
              height: 0.4 * this.state.height,
            }}
            torchMode={
              this.state.torchOn
                ? RNCamera.Constants.FlashMode.on
                : RNCamera.Constants.FlashMode.off
            }
            onBarCodeRead={this.onBarCodeRead}
            ref={cam => (this.camera = cam)}
          />
        </View>
        <View
          style={{
            height: 0.5 * this.state.height,
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text> {this.state.barCodeValue}</Text>
          {this.state.barCodeValue !== '' && (
            <Button
              title="save"
              onPress={() => {
                this.setState({
                  saveStatus: 'success',
                });
              }}
            />
          )}
          {this.state.saveStatus !== '' && (
            <Text>{this.state.saveStatus}</Text>
          )}
        </View>
      </View>
    );
  }
  handleTourch(value) {
    if (value === true) {
      this.setState({torchOn: false});
    } else {
      this.setState({torchOn: true});
    }
  }
}
const styles = StyleSheet.create({
  container: {},
  cameraIcon: {
    margin: 5,
    height: 40,
    width: 40,
  },
  bottomOverlay: {
    width: '100%',
  },
});
