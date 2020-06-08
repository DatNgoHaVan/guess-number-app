import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { CustomColors } from '../constants/colors';

const MainButton = (props: any) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: CustomColors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30
  },
  buttonText: {
    color: 'white',
    fontFamily: 'open-sans'
  }
})

export default MainButton;