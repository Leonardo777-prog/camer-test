import * as React from 'react';

import {Alert, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {runOnJS} from 'react-native-reanimated';
import {useCameraDevices, useFrameProcessor} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import {
  useScanBarcodes,
  BarcodeFormat,
  scanBarcodes,
  Barcode,
} from 'vision-camera-code-scanner';
import { extractDniArgentine } from '../helpers/taxIdDecoder';

export default function App() {
  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const [modalVisible, setModalVisible] = React.useState(true);
  const [isCameraActive, setIsCameraActive] = React.useState(true);
  // const [barcodes, setBarcodes] = React.useState<Barcode[]>([]);
  const [frameProcessor, barcodes] = useScanBarcodes(
    [BarcodeFormat.ALL_FORMATS],
    {
      checkInverted: true,
    },
  );

  // Alternatively you can use the underlying function:
  //
  // const frameProcessor = useFrameProcessor(frame => {
  //   'worklet';
  //   const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.ALL_FORMATS], {
  //     checkInverted: true,
  //   });
  //   if (detectedBarcodes.length > 0) runOnJS(setBarcodes)(detectedBarcodes);
  // }, []);

  

  React.useEffect(() => {
    console.log(barcodes.length);
    if (barcodes.length > 0) {
      setModalVisible(true);
      setIsCameraActive(false);
      console.log(barcodes);
    }
  }, [barcodes]);

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  if (!hasPermission || !device) return <Text>Hola</Text>

  return (
  
      <>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{extractDniArgentine(barcodes[0]?.displayValue ? barcodes[0]?.displayValue : '')}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setIsCameraActive(true);
                }}>
                <Text style={styles.textStyle}>Marcar Ingreso</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isCameraActive}
          frameProcessor={frameProcessor}
          focusable={true}
          frameProcessorFps={1}
          torch={'on'}
        />
        {/* {barcodes.map((barcode, idx) => (
          <Text key={idx} style={styles.barcodeTextURL}>
            {barcode.displayValue}
          </Text>
        ))} */}
      </>
    
  );
}

const styles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: 'black',
    marginBottom: 15,
    textAlign: 'center',
  },
});
