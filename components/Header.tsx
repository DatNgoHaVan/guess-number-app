import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CustomColors } from '../constants/colors';
import TitleText from './TitleText';

interface IOwnProps {
  title: string
}

const Header = (props: IOwnProps) => {
  return (
    <View style={styles.header}>
      <TitleText>{props.title}</TitleText>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: CustomColors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Header
