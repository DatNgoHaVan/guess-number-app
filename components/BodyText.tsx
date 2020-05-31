import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const BodyText = (props: any) => <Text style={{ ...styles.body, ...props.style }}> {props.children}</Text >

const styles = StyleSheet.create({
  body: {
    fontFamily: 'open-sans-bold'
  }
})

export default BodyText