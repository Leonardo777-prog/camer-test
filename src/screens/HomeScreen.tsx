import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Text,Button } from 'react-native'
import { extractDniArgentine } from '../helpers/taxIdDecoder'

interface Props extends StackScreenProps<any, any> {}

export const HomeScreen = ({navigation}:Props) => {
  console.log(extractDniArgentine('00617496408@CANO@LEONARDO MAURICIO@M@42205551@B@16/09/1999@11/11/2019@208'));
  return (
    <>
    <Button title='IR a qr' onPress={()=> navigation.push('qr')}/>
    <Text>sssssssssssssssssssssssssss</Text>
    </>
  )
}
