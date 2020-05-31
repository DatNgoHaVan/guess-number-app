import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import { guessDirections } from '../constants/guessDirections';
import defaultStyles from '../constants/default-styles';

interface IOwnProps {
  userChoice: number;
  onGameOver(numOfRounds: number): void;
}

const genRandomBetween: any = (min: number, max: number, exclude: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return genRandomBetween(min, max, exclude);
  } else {
    return rndNum
  }
}

const GameScreen = (props: IOwnProps) => {
  const [currentGuess, setCurrentGuess] = useState(genRandomBetween(1, 100, props.userChoice));
  const [rounds, setRounds] = useState(0);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(rounds)
    }
  }, [currentGuess, userChoice, onGameOver])

  const nextGuessHandler = (direction: string) => {
    if (
      direction === guessDirections.lower && currentGuess < props.userChoice ||
      direction === guessDirections.higher && currentGuess > props.userChoice
    ) {
      Alert.alert(
        `Don't lie!`,
        `You know that this is wrong...`,
        [{ text: 'Sorry!', style: 'cancel' }]
      );
      return;
    } else if (direction === guessDirections.lower) {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = genRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setRounds(curRounds => curRounds + 1)
  }

  return (
    <View style={styles.screen}>
      <Text style={defaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="Lower" onPress={() => { nextGuessHandler('lower') }} />
        <Button title="Higher" onPress={() => { nextGuessHandler('higher') }} />
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%'
  }
})

export default GameScreen