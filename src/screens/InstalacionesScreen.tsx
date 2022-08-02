import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  Text,
  Button,
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal
} from 'react-native';
import {extractDniArgentine} from '../helpers/taxIdDecoder';
import { useEffect, useState } from 'react';
import { Alert, Pressable } from 'react-native';

interface Props extends StackScreenProps<any, any> {}

export const InstalacionScreen = ({navigation}: Props) => {
    const [modalVisible, setModalVisible] = useState(false);
useEffect(() => {
  navigation.setOptions({
    headerStyle: {
      backgroundColor: '#e6f4ff',
      elevation: 0,
    },
    headerTitleStyle: {
      color: '#3f5075',
    }
  });
}, []);

  console.log(
    extractDniArgentine(
      '00617496408@CANO@LEONARDO MAURICIO@M@42205551@B@16/09/1999@11/11/2019@208',
    ),
  );
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.list} onPress={() => navigation.push('Home')}>
          <View >
            <Text style={{color: '#3f5075', fontSize: 15, fontWeight: 'bold'}}>
                PLANTA MERCADO LIBRE CHILE
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.list} onPress={() => console.log('12')}>
          <View >
            <Text style={{color: '#3f5075', fontSize: 15, fontWeight: 'bold'}}>
              MERCADO LIBRE CHILE
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>¿Desea Marcar Ingresos en esta Instalacion?</Text>
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Si</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Si</Text>
            </Pressable>
            </View>

          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  list: {
    marginBottom: 10,
    backgroundColor: '#dbf0fd',
    padding: 20,
    borderRadius: 20,
    marginHorizontal: 10,
    elevation: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
