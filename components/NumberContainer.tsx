import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CustomColors } from '../constants/colors';

const NumberContainer = (props: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: CustomColors.accent,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    color: CustomColors.accent,
    fontSize: 22
  }
})

export default NumberContainer