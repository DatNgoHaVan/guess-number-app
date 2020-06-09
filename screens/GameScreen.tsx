import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import { guessDirections } from '../constants/guessDirections';
import defaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

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

const renderListItem = (guess: any, numOfRound: number) => (
  <View key={guess} style={styles.listItem}>
    <BodyText>#{numOfRound}</BodyText>
    <Text>{guess}</Text>
  </View>
)

const GameScreen = (props: IOwnProps) => {
  const initGuess = genRandomBetween(1, 100, props.userChoice);

  const [currentGuess, setCurrentGuess] = useState(initGuess);
  const [rounds, setRounds] = useState(0);
  const [passGuesses, setPassGuesses] = useState<any[]>([initGuess]);


  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      onGameOver(passGuesses.length)
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
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = genRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    // setRounds(curRounds => curRounds + 1);
    setPassGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
  }

  return (
    <View style={styles.screen}>
      <Text style={defaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => { nextGuessHandler('lower') }} >
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={() => { nextGuessHandler('higher') }} >
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.list}>
        <ScrollView>
          {passGuesses.map((guess, index) =>
            renderListItem(guess, passGuesses.length - index)
          )}
        </ScrollView>
      </View>
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
  },
  list: {
    width: '80%',
    flex: 1,
  },
  listItem: {
    borderColor: 'black',
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})

export default GameScreen