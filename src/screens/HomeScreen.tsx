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
import {useEffect} from 'react';

interface Props extends StackScreenProps<any, any> {}

export const HomeScreen = ({navigation}: Props) => {

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
        <TouchableOpacity style={styles.list} onPress={() => navigation.push('Instalaciones')}>
          <View >
            <Text style={{color: '#3f5075', fontSize: 15, fontWeight: 'bold'}}>
              MERCADO LIBRE CHILE
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.list} onPress={() => console.log('12')}>
          <View >
            <Text style={{color: '#3f5075', fontSize: 15, fontWeight: 'bold'}}>
              MERCADO LIBRE BRASIL
            </Text>
          </View>
        </TouchableOpacity>
      </View>
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
});
