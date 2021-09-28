import React, { Component } from 'react';
import { StyleSheet, View, Button, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  types,
} from 'react-native-document-picker'
import RNFS from 'react-native-fs';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
    };
  }

  handleError = (err) => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled')
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <Text>aa</Text>
        <View style={styles.container}>
          <Button
            title="open picker for single file selection"
            onPress={async () => {
              const res = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.pdf],
                copyTo: 'cachesDirectory',
              });
              this.setState({
                vUploadSpecManualPdfUri: res.fileCopyUri,
                vUploadSpecManualPdfName: res.name
              })
            }
            }
          />
          <Button
            title="open picker for multi file selection"
            onPress={() => {
              DocumentPicker.pickMultiple().then((pickerResult) => this.setState({ result: pickerResult })).catch(handleError)
            }}
          />
          <Button
            title="open picker for multi selection of word files"
            onPress={() => {
              DocumentPicker.pick({
                allowMultiSelection: true,
                type: [types.doc, types.docx],
              })
                .then((pickerResult) => this.setState({ result: pickerResult }))
                .catch(this.handleError)
            }}
          />
          <Button
            title="open picker for single selection of pdf file"
            onPress={() => {
              DocumentPicker.pick({
                type: types.pdf,
              })
                .then(async (pickerResult) => {
                  this.setState({ result: pickerResult })
                })
                .catch(this.handleError)
            }}
          />
          <Button
            title="open directory picker (android+windows only)"
            onPress={() => {
              DocumentPicker.pickDirectory().then((pickerResult) => this.setState({ result: pickerResult })).catch(handleError)
            }}
          />

          <Text>Result: {JSON.stringify(this.state.result, null, 2)}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
})
